import { defineComponent } from 'vue';
import styles from './index.module.scss';
import { ref } from 'vue';
import { Upload, MessagePlugin } from 'tdesign-vue-next';
import { XMLParser } from 'fast-xml-parser';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface SourceMap {
  link: string;
  name: string;
}

interface Points {
  lat: number;
  lon: number;
  elevation: number;
  time: number | null;
}

const Map = defineComponent({
  name: 'Map',
  setup() {
    // 数据源
    const source = ref<SourceMap>({
      link: '',
      name: ''
    });
    // 速度
    const stats = ref({
      totalDistance: 0,
      avgSpeed: 0,
      maxElevation: 0,
      top: 0,
      down: 0,
      pointCount: 0
    });
    const map = ref();
    const polyline = ref();
    // 轨迹点
    const points = ref<Points[]>([]);

    const calculateStats = (points: Points[]) => {
      let totalDistance = 0;
      let totalTime = 0;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i] as Points;

        // 计算两点间距离（Haversine公式）
        const dLat = (curr.lat - prev.lat) * (Math.PI / 180);
        const dLon = (curr.lon - prev.lon) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(prev.lat * (Math.PI / 180)) *
            Math.cos(curr.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        totalDistance += 6371 * c; // 地球半径6371公里

        // 计算时间差（如果存在时间戳）
        if (prev.time && curr.time) {
          totalTime += (curr.time - prev.time) / 1000; // 转换为秒
        }
      }
      // 平均速度（单位：公里/小时）
      const avgSpeed = totalTime > 0 ? totalDistance / (totalTime / 3600) : 0;
      const elevations = points.map((p) => p.elevation);
      const maxElevation = Math.max(...elevations);

      // 计算总爬升/下降
      let totalClimb = 0,
        totalDescent = 0;
      for (let i = 1; i < points.length; i++) {
        const delta = points[i].elevation - points[i - 1].elevation;
        if (delta > 0) totalClimb += delta;
        else totalDescent += Math.abs(delta);
      }
      stats.value = {
        totalDistance,
        avgSpeed,
        maxElevation,
        top: totalClimb,
        down: totalClimb,
        pointCount: points.length
      };
    };

    const drawMap = (points: Points[]) => {
      if (polyline.value) {
        map.value.removeLayer(polyline.value);
      }
      // 初始化地图（如果未初始化）
      if (!map.value) {
        map.value = L.map('map').setView([points[0].lat, points[0].lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: source.value.name
        }).addTo(map.value);
        L.marker([points[0].lat, points[0].lon]).addTo(map.value);
        L.marker([points[points.length - 1].lat, points[points.length - 1].lon]).addTo(map.value);
      }
      // 绘制轨迹
      const latLngs = points.map((p) => [p.lat, p.lon]) as [number, number][];
      polyline.value = L.polyline(latLngs, { color: 'blue' }).addTo(map.value);

      map.value.fitBounds(polyline.value.getBounds());
    };

    const parseGPX = (gpxData: string) => {
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_'
      });
      const result = parser.parse(gpxData);
      console.log(result);

      // 提取轨迹点数据
      const trkseg = result.gpx.trk?.trkseg || result.gpx.trkseg;
      const gpxSource = result.gpx.trk || result.gpx;
      source.value = {
        name: gpxSource.name,
        link: gpxSource.link?.['@_href'] 
      };
      return trkseg.trkpt.map((pt: { [x: string]: string; ele: string; time: any; }) => ({
        lat: parseFloat(pt['@_lat']),
        lon: parseFloat(pt['@_lon']),
        elevation: parseFloat(pt.ele),
        time: pt.time || null
      }));
    };

    const handlePrevChange = (file: any) => {
      console.log('on prev change', file[0].name);
      if (!['.gpx'].includes(file[0].name.slice(-4))) {
        return MessagePlugin('error', '请选择 GPX 文件。');
      }
    };

    const handleChange = (file: any) => {
      console.log('on change', file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const gpxData = e?.target?.result as string;
        points.value = parseGPX(gpxData);
        calculateStats(points.value);
        drawMap(points.value);
      };

      reader.readAsText(file[0].raw);
    };

    const handleSuccess = (file: any) => {
      console.log('on success', file);
    };

    return () => (
      <div class={styles.map}>
        <Upload
          accept=".gpx"
          autoUpload={false}
          max={1}
          onSelectChange={handlePrevChange}
          onChange={handleChange}
          onSuccess={handleSuccess}
        />

        <div class={styles['map-source']}>
          <p>路线名称：{source.value.name}</p>
          <p>路线源址：{source.value.link}</p>
        </div>
        <div class={styles['map-content']}>
          <div id="map" style="width: 100%; height: 500px;"></div>
        </div>
        <div class={styles['map-stats']}>
          <p>总距离: {stats.value.totalDistance.toFixed(2)} 公里</p>
          <p>平均速度: {stats.value.avgSpeed.toFixed(2)} 公里/小时</p>
          <p>海拔: {stats.value.maxElevation.toFixed(2)} M 爬升: {stats.value.top.toFixed(2)} M 下降: {stats.value.down.toFixed(2)} M </p>
          <p>轨迹点数: {stats.value.pointCount}</p>
        </div>
      </div>
    );
  }
});

export default Map;

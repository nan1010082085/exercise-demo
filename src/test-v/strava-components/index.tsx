import { defineComponent } from 'vue';

const StravaComponent = defineComponent({
  setup() {
    return () => {
      return (
          <div
            class="strava-embed-placeholder"
            data-embed-type="route"
            data-embed-id="3332599340978319808"
            data-units="metric"
            data-style="standard"
            data-terrain="3d"
            data-surface-type="true"
            data-map-hash="8.7/40.2233/116.1588"
            data-from-embed="true"
          ></div>
      );
    };
  }
});

export default StravaComponent

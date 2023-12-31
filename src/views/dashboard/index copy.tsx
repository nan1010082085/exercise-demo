import { defineComponent, ref } from 'vue';
import { Button } from 'tdesign-vue-next';
import { getRandomObj, type RandomObj } from '@/api/preson-work-api';
import EPageHeader from '@/components/e-page-header';
import styles from './index.module.scss';

const PersonWork = defineComponent({
  setup() {
    // 假设有一个缓存
    // 每次执行缓存查询时过期的缓存被（替换或删除）
    const cache = ref<WeakMap<RandomObj, any>>(new WeakMap());

    // 生成一个对象键值对 weakmap
    // 如果 RandomObj 被干掉， 那么weakmap的机制将会回收
    const result = ref<WeakMap<RandomObj, any>>(new WeakMap());

    // 增加一个队列数组
    const queueArray = ref<RandomObj[]>([]);
    // 定义一个锁， true表示空闲， false表示正在执行
    const isIdleQueue = ref(true);
    const count = ref(0);

    // 新增一个待执行对象
    const add = async () => {
      const { data } = (await getRandomObj()) as Record<string, RandomObj>;
      // const data = renderCacheObj();
      // 队列状态锁定时插入待执行
      if (!isIdleQueue.value) {
        console.log(count.value++, `插入【${data.id}】到待执行列表`);
        queueArray.value.push(data);
      } else {
        queue(data);
      }
    };

    /**
     * 查询队列
     * @param object 查询对象
     * @param isCache 是否使用缓存
     */
    const queue = async (object: RandomObj, isCache: Boolean = true) => {
      // 有缓存，直接获取，不改变队列状态
      // if (cache.value.has(object) && isCache) {
      //   result.value.set(object, cache.value.has(object));
      //   return console.log('使用缓存');
      // }
      // 没有缓存，改变队列状态，进行数据查询
      if (isIdleQueue.value) {
        isIdleQueue.value = false;
        const data = await getData(object);
        // 存入缓存
        cache.value.set(object, data);
        // 获取数据
        result.value.set(object, data);
        if (data) {
          console.log(count.value--, `当前获取【${object.id}】`);
          // 解除队列锁定
          isIdleQueue.value = true;
          if (queueArray.value.length) {
            for (let i = 0; i < queueArray.value.length; i++) {
              const d = queueArray.value[i];
              // 队列解锁后删除数组待执行队列第一项，并执行该对象
              isIdleQueue.value && queueArray.value.shift();
              queue(d);
            }
          }
        }
      }
    };

    const getData = async (arg: RandomObj) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(arg);
          resolve(arg);
        }, 1500);
      });
    };

    return () => {
      return (
        <div class={styles['person-work-wrapper']}>
          <EPageHeader title="工作台"></EPageHeader>
          <div>
            <Button onClick={add}>增加</Button>
          </div>
        </div>
      );
    };
  }
});

export default PersonWork;

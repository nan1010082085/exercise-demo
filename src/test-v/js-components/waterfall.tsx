import { defineComponent, nextTick, onMounted, ref } from 'vue';
import styles from './waterfall.module.scss';
import { dataset } from './waterfall.dataset';

const Waterfall = defineComponent({
  setup() {
    const list = ref(dataset);
    const rowEnds = ref<Record<string, any>>([]);

    const wateResize = (index: number) => {
      let result = {};
      const tag = document.getElementById(`wateId${index}`);
      if (tag) {
        console.log(tag.offsetHeight);
        result = {
          gridRowEnd: `span ${Math.ceil(tag.offsetHeight)}`
        };
      }
      rowEnds.value.push(result);
    };

    onMounted(() => {
      list.value.forEach((_, i) => wateResize(i));
    });

    return () => {
      return (
        <>
          <h2> 瀑布 </h2>
          <div class={styles.waterfall}>
            <section class={styles.container}>
              {list.value.map((item, i) => {
                return (
                  <div id={`wateId${i}`} style={[rowEnds.value[i]]} class={styles.wateItem} key={item.id}>
                    <img class={styles.img} src={item.image} />
                    <p>{item.name}</p>
                    <p>{item.author}</p>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </section>
          </div>
        </>
      );
    };
  }
});

export default Waterfall;

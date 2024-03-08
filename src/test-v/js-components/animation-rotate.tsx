import { defineComponent, ref } from 'vue';
import styles from './animation-rotate.module.scss';

const AnimationRotate = defineComponent({
  name: 'AnimationRotate',
  setup() {
    const list = ref([
      {
        name: '1'
      },
      {
        name: '2'
      },
      {
        name: '3'
      },
      {
        name: '4'
      },
      {
        name: '5'
      },
      {
        name: '6'
      },
      {
        name: '7'
      },
      {
        name: '8'
      },
      {
        name: '9'
      },
      {
        name: '10'
      }
    ]);

    return () => {
      return (
        <div class={styles.container}>
          {list.value.map((item, i) => {
            return (
              <div class={styles['list-item']} style={{ '--dx': `${5 - i}s`, '--dy': `${0 - i}s` }} key={i}>
                {item.name}
              </div>
            );
          })}
        </div>
      );
    };
  }
});

export default AnimationRotate;

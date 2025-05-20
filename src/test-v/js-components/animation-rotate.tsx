import { computed, defineComponent, nextTick, ref } from 'vue';
import styles from './styles/animation-rotate.module.scss';
import { Button } from 'tdesign-vue-next';

const AnimationRotate = defineComponent({
  name: 'AnimationRotate',
  setup() {
    const animationRunning = ref(true);
    const buttonText = computed(() => (animationRunning.value ? '停止' : '开始'));

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

    const handleRunning = () => {
      animationRunning.value = !animationRunning.value;
    };

    return () => {
      return (
        <div class={styles.container}>
          <Button onClick={handleRunning}>{buttonText.value}</Button>
          {list.value.map((item, i) => {
            return (
              <div
                class={styles['list-item']}
                style={{
                  '--dx': `${5 - i}s`,
                  '--dy': `${0 - i}s`,
                  animationPlayState: animationRunning.value ? 'running' : 'paused'
                }}
                key={i}
              >
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

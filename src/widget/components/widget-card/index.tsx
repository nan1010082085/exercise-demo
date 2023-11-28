import { computed, defineComponent, type PropType } from 'vue';
import styles from './index.module.scss';
import { Button, Card, Space } from 'tdesign-vue-next';
import { CreditcardAddIcon, DeleteIcon } from 'tdesign-icons-vue-next';

export interface TData {
  title: string;
  imageUrl: string;
}

const widgetCard = defineComponent({
  props: {
    data: {
      type: Object as PropType<TData>,
      defult: () => ({
        title: ''
      })
    }
  },
  emits: [],
  setup(_, { emit, slots }) {
    const _card = computed(() => _.data);

    return () => {
      return (
        <Card title={_card.value?.title} class={styles['card-wrapper']} bordered hoverShadow>
          {{
            default: () => <div class={styles['card-image']}>{slots.default?.()}</div>,
            footer: () => (
              <Space size={'small'}>
                <Button theme="default" shape="circle" icon={() => <CreditcardAddIcon />}></Button>
                <Button theme="default" shape="circle" icon={() => <DeleteIcon />}></Button>
              </Space>
            )
          }}
        </Card>
      );
    };
  }
});

export default widgetCard;

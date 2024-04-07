import { computed, defineComponent, type PropType } from 'vue';
import styles from './index.module.scss';
import { Button, Card, Space } from 'tdesign-vue-next';
import { DataSearchIcon, CreditcardAddIcon, DeleteIcon } from 'tdesign-icons-vue-next';

export interface TData {
  name: string;
  imageUrl: string;
}

const ECard = defineComponent({
  name: 'ECard',
  props: {
    data: {
      type: Object as PropType<Partial<TData>>,
      defult: () => ({
        title: ''
      })
    },
    footer: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    lookBtn: {
      type: Boolean as PropType<boolean>,
      default: true
    }
  },
  emits: ['imageClick', 'look', 'edit', 'del'],
  setup(_, { emit, slots }) {
    const _card = computed(() => _.data);

    const btns = computed(() => {
      return {
        look: (
          <Button
            theme="default"
            shape="circle"
            icon={() => <DataSearchIcon />}
            onClick={() => emit('look', _card.value)}
          ></Button>
        ),
        edit: (
          <Button
            theme="default"
            shape="circle"
            icon={() => <CreditcardAddIcon />}
            onClick={() => emit('edit', _card.value)}
          ></Button>
        ),
        del: (
          <Button
            theme="default"
            shape="circle"
            icon={() => <DeleteIcon />}
            onClick={() => emit('del', _card.value)}
          ></Button>
        )
      };
    });

    return () => {
      return (
        <Card title={_card.value?.name} class={styles['card-wrapper']} bordered hoverShadow>
          {{
            default: () => (
              <div class={styles['card-image']} onClick={() => emit('imageClick', _card.value)}>
                {slots.default?.()}
              </div>
            ),
            footer: _.footer ? () => (
              <Space size={'small'}>
                {_.lookBtn ? btns.value.look : null}
                {btns.value.edit}
                {btns.value.del}
              </Space>
            ) : null
          }}
        </Card>
      );
    };
  }
});

export default ECard;

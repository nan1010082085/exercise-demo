import type { DashboardListModels } from '@/constants/dashboard.models';
import {
  Drawer,
  Form,
  FormItem,
  Input,
  Textarea,
  Image,
  Row,
  Col,
  Icon,
  Tooltip,
  Tag,
  Switch,
  type SwitchValue
} from 'tdesign-vue-next';
import { defineComponent, ref, type PropType, computed, unref, watch } from 'vue';
import styles from './index.module.scss';
import { cloneDeep } from 'lodash-es';

const AddDashboard = defineComponent({
  name: 'AddDashboard',
  props: {
    type: {
      type: String as PropType<'add' | 'edit' | 'look'>
    },
    formData: {
      type: Object as PropType<Partial<DashboardListModels>>,
      default: () => ({})
    }
  },
  emits: ['confirm'],
  setup(_, { emit, expose }) {
    const visible = ref(false);
    const isLook = computed(() => _.type === 'look');
    const title = computed(() => {
      return _.type === 'add' ? '新增仪表板' : _.type === 'edit' ? '编辑仪表板' : '查看仪表板';
    });
    const form = ref<Partial<DashboardListModels>>({});
    const switchValue = ref(1);

    watch(
      () => _.formData,
      () => {
        form.value = cloneDeep(unref(_.formData));
        switchValue.value = form.value.status || 1;
      },
      { immediate: true }
    );

    const onSwitchChange = (value: SwitchValue) => {
      form.value.status = value as number;
    };

    const open = () => {
      visible.value = true;
      form.value = cloneDeep(unref(_.formData));
      switchValue.value = form.value.status || 1;
    };

    const close = () => {
      visible.value = false;
      form.value = {};
    };

    const confirm = () => {
      visible.value = false;
      if (!isLook.value) {
        emit('confirm', form.value);
      }
    };

    expose({ open, close });

    return () => {
      return (
        <Drawer
          header={title.value}
          visible={visible.value}
          onClose={close}
          onConfirm={confirm}
          class={styles['add-dashboard']}
          size="800px"
        >
          {isLook.value ? (
            <Row class={styles['look-content']}>
              <Col class={styles['look-content-item']}>
                <div class={styles.label}>名称：</div>
                <div class={styles.body}>{form.value.name}</div>
              </Col>
              <Col class={styles['look-content-item']}>
                <div class={styles.label}>描述：</div>
                <div class={styles.body}>{form.value.name}</div>
              </Col>
              <Col class={styles['look-content-item']}>
                <div class={styles.label}>预览图片：</div>
                <div class={styles.body}>
                  <Image class={styles['draser-image']} src={form.value.prevewImage}></Image>
                </div>
              </Col>
              <Col class={styles['look-content-item']}>
                <div class={styles.label}>状态</div>
                <div class={styles.body}>
                  <Tag theme={form.value.status === 1 ? 'success' : 'danger'}>
                    {form.value.status ? '启用' : '停用'}
                  </Tag>
                </div>
              </Col>
              <Col class={styles['look-content-item']}>
                <div class={styles.label}>创建时间：</div>
                <div class={styles.body}>{form.value.createtime}</div>
              </Col>
              <Col class={styles['look-content-item']}>
                <div class={styles.label}>更新时间：</div>
                <div class={styles.body}>{form.value.updatetime}</div>
              </Col>
            </Row>
          ) : (
            <Form class={styles['form-content']} data={form.value} labelAlign="left">
              <FormItem label={'名称'}>
                <Input v-model={form.value.name}></Input>
              </FormItem>
              <FormItem label={'描述'}>
                <Textarea v-model={form.value.description} placeholder="请输入仪表板描述"></Textarea>
              </FormItem>
              <FormItem>
                {{
                  label: () => (
                    <div class={styles['form-item-label']}>
                      <span>预览图片</span>
                      <Tooltip placement="top" content={'预览图片自动生成'}>
                        <Icon name="questionnaire"></Icon>
                      </Tooltip>
                    </div>
                  ),
                  default: () => <Image class={styles['draser-image']} src={form.value.prevewImage}></Image>
                }}
              </FormItem>
              <FormItem label={'状态'}>
                <Switch
                  v-model={switchValue.value}
                  size="large"
                  label={['启用', '停用']}
                  customValue={[1, 0]}
                  onChange={onSwitchChange}
                ></Switch>
              </FormItem>
            </Form>
          )}
        </Drawer>
      );
    };
  }
});

export interface EAddDashboardInstance extends InstanceType<typeof AddDashboard> {
  open(): void;
  close(): void;
}

export default AddDashboard;

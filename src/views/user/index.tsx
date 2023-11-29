// 个人中心
import EPageHeader from '@/components/e-page-header';
import styels from './index.module.scss';
import { defineComponent, onMounted, ref } from 'vue';
import { Button, Form, FormItem, Input, Space, Switch, Tooltip } from 'tdesign-vue-next';
import { getUserInfo } from '@/api/user.api';
import type { UserInfoModels } from '@/constants/user.models';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  WechatOutlined,
  QqOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue';
import usePlugin from '@/composables/usePlugin';
import { DebugType } from '@/constants/debug.models';
import { getDebugMessage } from '@/utils/debug';
import { useRoute } from 'vue-router';
import useIndexedDB from '@/composables/useIndexedDB';

const EUser = defineComponent({
  name: 'EUser',
  setup() {
    const route = useRoute();
    const { debug } = usePlugin();
    const { getDBDataById } = useIndexedDB();

    const userInfo = ref<UserInfoModels>({
      name: '',
      wechat: '',
      qq: '',
      email: '',
      phone: '',
      isPush: false
    });

    // const getUser = () => {
    //   getUserInfo().then((res) => {
    //     userInfo.value = res.data;
    //   });
    // };

    const onSave = () => {
      const path = route.path + ' -> user.on-save';
      debug({ type: DebugType.USER, path, message: getDebugMessage('user.on-save'), status: 'info' });
    };

    onMounted(() => {
      getDBDataById(['userAdmin', 1], ['list'], 'readonly', 'list', 1, (e) => {
        userInfo.value = (e.target as IDBRequest<UserInfoModels>)?.result;
      });
      // getUser();
    });

    return () => {
      return (
        <div class={styels.wrapper}>
          <EPageHeader title="个人中心"></EPageHeader>
          <div class={styels.container}>
            <Form class={styels.form} label-align={'left'} label-width={'120px'} data={userInfo.value}>
              <FormItem label={'名称'} name="name">
                <Input v-model={userInfo.value.name}>
                  {{
                    suffixIcon: () => <UserOutlined />
                  }}
                </Input>
              </FormItem>
              <FormItem label={'邮箱'} name="email">
                <Input v-model={userInfo.value.email}>
                  {{
                    suffixIcon: () => <MailOutlined />
                  }}
                </Input>
              </FormItem>
              <FormItem label={'允许推送'} name="isPush">
                {{
                  label: () => {
                    return (
                      <Space size={'small'}>
                        允许推送
                        <Tooltip content={'此设置将开启邮件和短信推送！'}>
                          <Button variant="text" shape="circle">
                            <QuestionCircleOutlined />
                          </Button>
                        </Tooltip>
                      </Space>
                    );
                  },
                  default: () => <Switch v-model={userInfo.value.isPush} />
                }}
              </FormItem>
              <FormItem label={'手机号'} name="phone">
                <Input v-model={userInfo.value.phone}>
                  {{
                    suffixIcon: () => <PhoneOutlined />
                  }}
                </Input>
              </FormItem>
              <FormItem label={'微信'} name="weicat">
                <Input v-model={userInfo.value.wechat}>
                  {{
                    suffixIcon: () => <WechatOutlined />
                  }}
                </Input>
              </FormItem>
              <FormItem label={'QQ'} name="qq">
                <Input v-model={userInfo.value.qq}>
                  {{
                    suffixIcon: () => <QqOutlined />
                  }}
                </Input>
              </FormItem>

              <FormItem>
                <Button onClick={onSave}>保存</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      );
    };
  }
});

export default EUser;

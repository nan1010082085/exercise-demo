import { defineComponent } from 'vue';
import styles from '../index.module.scss';
import { Button, Divider, Popup, Space, MessagePlugin } from 'tdesign-vue-next';
import { Call1Icon, LogoQqIcon, LogoWechatIcon } from 'tdesign-icons-vue-next';
import { useRouter } from 'vue-router';
import VERSION from '@/utils/v.json';

const UserLogo = defineComponent({
  setup() {
    const router = useRouter();

    const onUserEdit = () => {
      MessagePlugin.info('修改用户信息。');
    };

    const onLogout = () => {
      MessagePlugin.success('退出成功。');
      router.push({ name: 'Login' });
    };

    return () => {
      return (
        <Popup overlayClassName={styles.popupContent} trigger="click">
          {{
            default: () => (
              <div class={styles.userLogo}>
                <img src="/image/user.jpg" alt="" />
              </div>
            ),
            content: () => (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Space>Yang Dong nan</Space>
                <Divider layout="vertical">版本</Divider>
                <Space>
                  <Button variant="text">更新时间：{VERSION.time}</Button>
                </Space>
                <Divider layout="vertical">信息</Divider>
                <Space>
                  <Button shape="circle" icon={() => <LogoWechatIcon />} />
                  <Button variant="text">nam1010082085</Button>
                </Space>
                <Space>
                  <Button shape="circle" icon={() => <LogoQqIcon />} />
                  <Button variant="text">1010082085</Button>
                </Space>
                <Space>
                  <Button shape="circle" icon={() => <Call1Icon />} />
                  <Button variant="text">15117960621</Button>
                </Space>
                <Divider layout="vertical">操作</Divider>
                <Space>
                  <Button onClick={onUserEdit}>修改</Button>
                  <Button theme="default" onClick={onLogout}>
                    退出
                  </Button>
                </Space>
              </Space>
            )
          }}
        </Popup>
      );
    };
  }
});

export default UserLogo;

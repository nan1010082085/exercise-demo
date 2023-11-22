import { defineComponent, reactive } from 'vue';
import styles from './index.module.scss';
import { Button, Form, FormItem, MessagePlugin, Space, Input as TInput } from 'tdesign-vue-next';
import { LockOnIcon, User1Icon } from 'tdesign-icons-vue-next';
import { useRouter } from 'vue-router';

const Login = defineComponent({
  setup() {
    const router = useRouter();

    const formData = reactive({
      username: 'admin',
      password: '123456'
    });

    const submit = () => {
      MessagePlugin.success('登陆成功');
      router.push({ name: 'Home' });
    };

    return () => {
      const loginEle = (
        <>
          <FormItem name="username" label={'用户名：'}>
            <TInput v-model={formData.username} placeholder="请输入" clearable prefixIcon={() => <User1Icon />} />
          </FormItem>
          <FormItem name="password" label={'密码：'}>
            <TInput
              v-model={formData.password}
              type="password"
              placeholder="请输入"
              clearable
              prefixIcon={() => <LockOnIcon />}
            />
          </FormItem>
        </>
      );

      return (
        <div class={styles.wrapper}>
          <Space class={styles.container} direction="vertical">
            <div class={styles.header}> EXERCISE DEMO </div>
            <div class={styles.formWrapper}>
              <Form data={formData}>
                {loginEle}
                <FormItem>
                  <Space>
                    <Button onClick={submit}>登陆</Button>
                    {/* <Button theme="default">注册并登陆</Button> */}
                  </Space>
                </FormItem>
              </Form>
            </div>
            <div class={styles.footer}> </div>
          </Space>
        </div>
      );
    };
  }
});

export default Login;

// 个人中心
import EPageHeader from '@/components/e-page-header';
import styels from './index.module.scss';
import { defineComponent } from 'vue';

const EUser = defineComponent({
  setup() {
    return () => {
      return <div class={styels.wrapper}>
        <EPageHeader title="个人中心"></EPageHeader>
      </div>;
    };
  }
});

export default EUser;

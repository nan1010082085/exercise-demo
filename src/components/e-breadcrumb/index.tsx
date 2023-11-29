import { defineComponent, defineAsyncComponent, watch } from 'vue';
import styles from './index.module.scss';
import { useGlobalStore } from '@/store/global-store';
import { Breadcrumb, BreadcrumbItem } from 'tdesign-vue-next';

const EBreadcrumb = defineComponent({
  name: 'EBreadcrumb',
  setup() {
    const { breadcrumbHistory } = useGlobalStore();

    return () => {
      return (
        <Breadcrumb class={styles.ebwrapper} maxItemWidth="120px">
          {breadcrumbHistory.map((item, index) => {
            return (
              <BreadcrumbItem to={item.path} key={index}>
                <span class={styles.ebcrumbItemText}>{item?.meta?.title || item.name}</span>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      );
    };
  }
});

export default EBreadcrumb;

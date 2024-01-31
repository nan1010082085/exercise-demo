import { defineComponent, defineAsyncComponent, watch } from 'vue';
import styles from './index.module.scss';
import { useGlobalStore } from '@/store/global-store';
import { Breadcrumb, BreadcrumbItem, Tag } from 'tdesign-vue-next';
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';

const EBreadcrumb = defineComponent({
  name: 'EBreadcrumb',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { breadcrumbHistory, closeBreadcrumb } = useGlobalStore();

    const to = (item: RouteRecordRaw) => {
      router.push(item.path);
    };

    const onCloeBreadcrumb = (e: MouseEvent, index: number) => {
      e.stopPropagation();
      closeBreadcrumb(index);
    };

    return () => {
      return (
        <Breadcrumb class={styles.ebwrapper} maxItemWidth="120px">
          {breadcrumbHistory?.map((item, index) => {
            return (
              <BreadcrumbItem key={index}>
                <Tag
                  class={styles.ebcrumbItemText}
                  theme={item.path == route.path ? 'primary' : 'default'}
                  closable={item.path != route.path}
                  onClick={() => to(item)}
                  onClose={(ctx) => onCloeBreadcrumb(ctx.e, index)}
                >
                  {item?.meta?.title || item.name}
                </Tag>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
      );
    };
  }
});

export default EBreadcrumb;

import type { RouteRecordRaw } from 'vue-router';

const routes = import.meta.glob('@/test-v/components/**');
const TextViewRoutes = Object.keys(routes).map((key) => {
  const KeyArrs = key.split('/');
  const name = KeyArrs[KeyArrs.length - 1].split('.')[0];
  return {
    name,
    path: '/test-v/' + name,
    component: routes[key]
  };
});

const TextView: RouteRecordRaw[] = TextViewRoutes;

export { TextViewRoutes };
export default TextView;

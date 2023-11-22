import type { RouteRecordRaw } from 'vue-router';

const creategory = import.meta.glob('@/test-v/**');
const routes = import.meta.glob('@/test-v/vue-components/**');

const creategoryKey = Object.keys(creategory)
  .map((key) => key.match(/[a-z]+-components+/g))
  .filter((f) => f);

const creategoryRoutes = Array.from(new Set(...creategoryKey));

const textViewRoutes = Object.keys(routes).map((key) => {
  const KeyArrs = key.split('/');
  const creategory = key.match(/[a-z]+-components/g);
  const name = KeyArrs[KeyArrs.length - 1].split('.')[0];
  return {
    name,
    creategory: creategory ? creategory[0] : '',
    path: '/test-v/' + creategory + '/' + name,
    component: routes[key]
  };
});

const TextView: RouteRecordRaw[] = textViewRoutes;

export { creategoryRoutes, textViewRoutes };
export default TextView;

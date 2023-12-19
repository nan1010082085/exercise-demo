import { useRoute, useRouter } from 'vue-router';

export default () => {
  const route = useRoute();
  const router = useRouter();

  console.log('redirect =', route);

  const { query, params } = route;

  const { path } = params;

  router.replace({ path: '/' + path, query });
};

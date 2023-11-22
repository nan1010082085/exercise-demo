import cardRoute from '@/router/path/card';

export interface MenuExtend {
  meta: {
    title: string;
    icon: string;
  };
}

export interface EMenu extends MenuExtend {
  name: string;
  path: string;
  children?: EMenu[];
}

export const MenuData: EMenu[] = cardRoute.map((item) => {
  const { path, meta } = item as EMenu;
  let children: EMenu[] = [];
  if (item?.children?.length) {
    children = item.children.map((item) => {
      const { path, meta } = item as EMenu;
      return { name: meta.title, path, meta };
    });
  }
  return { name: meta.title, path, meta, children: children };
});

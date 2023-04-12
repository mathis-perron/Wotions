/* -------------------------------------------------------------------------- */
/*                      is children page active checking                      */
/* -------------------------------------------------------------------------- */
interface Props1 {
  path: string;
  match: string;
}

export function isChildrenPageActive({ path, match }: Props1) {
  if (path && match) {
    if (path === match) {
      return true;
    }
    return false;
  }
  return false;
}

/* -------------------------------------------------------------------------- */
/*                       is parent page active checking                       */
/* -------------------------------------------------------------------------- */
interface Props2 {
  pages: any[];
  path: string;
}

export function isParentPageActive({ pages, path }: Props2) {
  if (pages) {
    return pages.some((page) => page.path === path);
  }
  return false;
}

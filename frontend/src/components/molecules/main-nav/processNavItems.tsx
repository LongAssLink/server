import { NavLinkItem } from './types';

/**
 * Go through list of navItems, attach id's to them and mark the active item (greedy match)
 * *Should be pretty memory efficient, none of the objects are copied*
 * @param navItems items to be displayed on the navbar
 * @param currentPath current browser locaation
 * @returns modified list of navitems with a unique id and active status indicator
 */
export function processNavItems(
  navItems: NavLinkItem[],
  currentPath: string
): Array<NavLinkItem & { active?: true; id: string }> {
  const copy: InternalNavItems[] = Array.from(navItems, (it, idx) => {
    const it_: Partial<InternalNavItems> = it;
    it_.id = [it.link, it.caption].join('#').toLowerCase();
    it_.__idx = idx;
    return it_ as InternalNavItems;
  });

  copy.sort((a, b) => b.link.length - a.link.length); // sort by link length

  const longestMatch = copy.findIndex(it => currentPath.startsWith(it.link));
  if (longestMatch > -1) {
    copy[longestMatch].active = true;
  }

  copy.sort((a, b) => (a.__idx ?? Infinity) - (b.__idx ?? Infinity));

  copy.forEach(it => {
    delete it.__idx;
  });

  return copy;
}

export type InternalNavItems = NavLinkItem & {
  id: string;
  active?: true;
  __idx?: number;
};

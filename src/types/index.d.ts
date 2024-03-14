export type SiteMeta = {
  name: string;
  description: string;
  links: {
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MenuItem = NavItem & {
  description?: string;
  launched?: boolean;
  external?: boolean;
};

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { navMenuConfig } from "@/config/nav-menu";

export function MainNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {navMenuConfig.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={navigationMenuTriggerStyle()}
            >
              {link.title}
            </a>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

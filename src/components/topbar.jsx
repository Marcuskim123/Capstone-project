import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Topbar() {

  return (
    <div className="w-full flex justify-center">
      <NavigationMenu className="w-full max-w-lg">
        <NavigationMenuList>
          <div className="flex flex-row gap-10 p-4 font-large justify-center">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
          <NavigationMenuItem className="">
            <NavigationMenuLink asChild>
              <Link href="/signup">Sign up</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const intro: { title: string; href: string; description: string }[] = [
  {
    title: "About Us",
    href: "/about",
    description: "Our history, our mission, and our vision for the future",
  },
  {
    title: "Customer Ratings",
    href: "/",
    description: "Customer overall ratings throughout the whole year",
  },
];

const shops: { title: string; href: string; description: string }[] = [
  {
    title: "Dịch Vụ 1",
    href: "",
    description: "Dịch Vụ 1 description",
  },
  {
    title: "Dịch Vụ 2",
    href: "",
    description: "Dịch Vụ 2 description",
  },
  {
    title: "Dịch Vụ 3",
    href: "",
    description: "Dịch Vụ 3 description",
  },
];

export default function Header() {
  return (
    <div className="mt-[2.25rem] ml-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#F3F4F6]">
              <Link to={"/"}>Getting Started</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to="/"
                    >
                      <Icons.logo className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem to="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem
                  to="/docs/installation"
                  title="Installation"
                >
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem
                  to="/docs/primitives/typography"
                  title="Typography"
                >
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#F3F4F6]">
              Giới Thiệu
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {intro.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    to={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#F3F4F6]">
              Dịch Vụ
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                {shops.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    to={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-[#F3F4F6]`}>
              Thông Tin
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()}`}>
              Liên Hệ
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});


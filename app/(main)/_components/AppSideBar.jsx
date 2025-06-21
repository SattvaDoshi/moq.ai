"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SideBarOptions } from "@/services/Constants";

export function AppSidebar() {
  const path = usePathname();
  console.log(path, "path");

  return (
    <Sidebar>
      <SidebarHeader className={"flex items-center mt-5"}>
       <div className="flex items-center gap-3">
         <Image
          src={"/logo.svg"}
          alt="logo"
          width={50}
          height={50}
          className="w-[50px]"
        />
        <h1 className="text-2xl font-bold">Moq.AI</h1>
       </div>

      </SidebarHeader>
      <hr className="bg-white opacity-25 mt-2 mx-5"/>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent className={"list-none"}>
            {SideBarOptions.map((option, index) => (
              <SidebarMenuItem key={index} className={"p-1"}>
                <SidebarMenuButton
                  asChild
                  className={`p-5 ${path === option.path && " bg-primary"}`}
                >
                  <Link href={option.path}>
                    <option.icon
                      className={`${path === option.path && "text-white"}`}
                    />
                    <span
                      className={`text-[16px] ${
                        path === option.path && "text-white"
                      }`}
                    >
                      {option.name}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOpt } from "@/services/constant"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Settings, User, LogOut, Sparkles } from "lucide-react"
import { useUser } from "@/app/provider"

export function AppSidebar() {
    const navPath = usePathname();
    const { user } = useUser();
    
    return (
        <Sidebar className="border-r border-sidebar-border bg-sidebar">
            {/* Header */}
            <SidebarHeader className="p-6 border-b border-sidebar-border/50">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                            <Image 
                                src="/logo.svg" 
                                alt="Moq.AI Logo" 
                                width={24} 
                                height={24}
                                className="filter brightness-0 invert"
                            /> 
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-sidebar-primary rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sidebar-foreground font-bold text-lg tracking-tight">Moq.AI</span>
                        <span className="text-sidebar-foreground/60 text-xs font-medium">Interview Assistant</span>
                    </div>
                </div>
                
                {/* AI Status Badge */}
                <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-sidebar-accent rounded-lg">
                    <Sparkles className="w-3 h-3 text-sidebar-primary animate-pulse" />
                    <span className="text-xs text-sidebar-accent-foreground font-medium">AI Ready</span>
                </div>
            </SidebarHeader> 

            {/* Navigation Content */}
            <SidebarContent className="px-3 py-4">
                <SidebarGroup>
                    <SidebarMenu className="space-y-1">
                        {SideBarOpt.map((item, idx) => {
                            const isActive = item.path === navPath;
                            return (
                                <SidebarMenuItem key={idx}>
                                    <SidebarMenuButton asChild className="group">
                                        <Link href={item.path} className="block">
                                            <div className={`
                                                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                                                ${isActive 
                                                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/25" 
                                                    : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                                                }
                                            `}>
                                                {/* Active indicator */}
                                                {isActive && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 opacity-100"></div>
                                                )}
                                                
                                                {/* Icon */}
                                                <div className="relative z-10 flex items-center gap-3 w-full">
                                                    <item.icon className={`
                                                        w-5 h-5 transition-transform duration-300 
                                                        ${isActive ? "scale-110" : "group-hover:scale-105"}
                                                    `} />
                                                    
                                                    {/* Text */}
                                                    <span className="font-medium text-sm tracking-wide">
                                                        {item.name}
                                                    </span>
                                                    
                                                    {/* Arrow indicator for active */}
                                                    {isActive && (
                                                        <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
                                                    )}
                                                </div>
                                                
                                                {/* Hover effect */}
                                                <div className="absolute inset-0 bg-sidebar-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                            </div>
                                        </Link>          
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
                
                {/* Divider */}
                <div className="my-6 h-px bg-sidebar-border/50"></div>
                
                {/* Additional Menu Items */}
                <SidebarGroup>
                    <SidebarMenu className="space-y-1">
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="group">
                                <Link href="/settings" className="block">
                                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent relative overflow-hidden">
                                        <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                                        <span className="font-medium text-sm">Settings</span>
                                        <div className="absolute inset-0 bg-sidebar-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            
            {/* Footer */}
            <SidebarFooter className="p-4 border-t border-sidebar-border/50">
                {/* User Profile */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors duration-300 cursor-pointer group">
                    <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-sidebar-primary/80 rounded-lg flex items-center justify-center">
                        {user?.profile ? (<Image src={user.profile} alt="Profile" width={32} height={32} />)
                         : <User className="w-4 h-4 text-sidebar-primary-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
                        <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-sidebar-foreground/40 group-hover:text-sidebar-foreground transition-colors" />
                </div>
                
                {/* Logout Button */}
                <button className="w-full flex items-center gap-3 p-3 mt-2 rounded-xl text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group">
                    <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Sign Out</span>
                </button>
                
                {/* Version Info */}
                <div className="mt-4 pt-4 border-t border-sidebar-border/30">
                    <p className="text-xs text-sidebar-foreground/40 text-center">
                        Version 2.1.0
                    </p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
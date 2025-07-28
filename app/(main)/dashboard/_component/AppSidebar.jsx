"use client"
import { Button } from "@/components/ui/button"
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
import { SideBarOptions } from "@/services/constants"
import { Plus, Brain, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
  
export function AppSidebar() {
  const path = usePathname();
  console.log(path)
  
  return (
    <Sidebar className="border-r border-white/10 bg-gray-900/95 backdrop-blur-xl">
      <SidebarHeader className='flex items-center p-6'>
        {/* InterviewAce Logo */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
            <Brain size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
            InterviewAce
          </div>
        </div>
        
        {/* Create New Interview Button */}
        <Button className='w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg transition-all duration-300 rounded-xl border-0'>
          <Plus className="mr-2" size={16} />
          Start New Interview
        </Button>
        
        
      </SidebarHeader>
      
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu className="space-y-2">
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton 
                    asChild 
                    className={`
                      p-4 rounded-xl transition-all duration-300 hover:bg-white/10 group
                      ${path === option.path 
                        ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-500/30 shadow-lg shadow-blue-500/10' 
                        : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                      }
                    `}
                  >
                    <Link href={option.path} className="flex items-center  space-x-3 w-full">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
                        ${path === option.path 
                          ? 'bg-gradient-to-br from-blue-500 to-green-600 text-white shadow-md' 
                          : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'
                        }
                      `}>
                        <option.icon size={16} />
                      </div>
                      <span className={`
                        text-[15px] font-medium transition-colors duration-300
                        ${path === option.path 
                          ? 'text-white' 
                          : 'text-gray-300 group-hover:text-white'
                        }
                      `}>
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-6 border-t border-white/10">
        {/* User info or upgrade prompt */}
        <div className="space-y-3">
          {/* Upgrade to Pro Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-purple-500/30">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
              <span className="text-sm font-medium text-white">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-gray-400 mb-3">
              Unlock unlimited interviews and advanced features
            </p>
            <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xs h-8">
              Upgrade Now
            </Button>
          </div>
          
          {/* App Version */}
          <div className="text-center">
            <p className="text-xs text-gray-500">InterviewAce v1.0</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

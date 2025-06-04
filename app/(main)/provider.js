'use client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/SideBar'
import { useUser } from '../provider'

const DashBoardProvider = ({ children }) => {
 
  return (
    <SidebarProvider>
      <AppSidebar/>
        <div>
          <SidebarTrigger/>
          {children}
        </div>
      </SidebarProvider>
  )
}

export default DashBoardProvider
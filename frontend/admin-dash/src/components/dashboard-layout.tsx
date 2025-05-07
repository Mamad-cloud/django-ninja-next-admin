"use client"

import { AppSidebar } from "@/components/app-sidebar"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { SidebarData } from "@/lib/definitions"
import { ModeToggle } from "./ui/mode-toggle"
import { usePathname } from "next/navigation"
import React from "react"

export default function Dashboard({children, sidebarData}: {children: React.ReactNode, sidebarData: SidebarData}) {
  
  const pathname = usePathname()
  const breadCrumbs = pathname.split('/').slice(1).map(( path, idx, arr) => {
    if ( idx === arr.length - 1) {
      return (
        <BreadcrumbItem key={idx} className="hidden md:block">
          <BreadcrumbPage>{path[0].toUpperCase() + path.substring(1)}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    } else {
      return (
        <React.Fragment key={idx}>
          <BreadcrumbLink  href={`/${arr.slice(0, idx + 1).join('/')}`}>
            {path[0].toUpperCase() + path.substring(1)}
          </BreadcrumbLink>
            <BreadcrumbSeparator className="hidden md:block" />
          </React.Fragment>
      )
    }

  })

  
  return (
    <SidebarProvider>
      <AppSidebar data={sidebarData}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center pr-4 justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadCrumbs}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div >
            <ModeToggle />

          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

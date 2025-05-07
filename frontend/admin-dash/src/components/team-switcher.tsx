"use client"

import { useState, useEffect } from "react"
import { ChevronsUpDown, Flower, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Team } from "@/lib/definitions"
import { useTeam } from "@/components/team-provider"

export function TeamSwitcher({
  teams,
}: {
  teams: Team[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const teamContext = useTeam();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Load the active team from local storage if available
      const savedTeam = localStorage.getItem("activeTeam");
      if (savedTeam) {
        setActiveTeam(JSON.parse(savedTeam));
      } else {
        setActiveTeam(teams[0]);
      }
    }
  }, [isMounted, teams]);

  useEffect(() => {
    if (activeTeam) {
      // Set the active team in the context
      teamContext.setActiveTeam(activeTeam.id, activeTeam.name as string);
      // Save the active team to local storage
      localStorage.setItem("activeTeam", JSON.stringify(activeTeam));
    }
  }, [activeTeam, teamContext]);

  const handleTeamChange = (team: Team) => {
    setActiveTeam(team);
  };

  if (!activeTeam) {
    return null //or a loading spinner
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {/* <activeTeam.logo className="size-4" /> */}
                <Flower className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => {
                  handleTeamChange(team)
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {/* <team.logo className="size-4 shrink-0" /> */}
                  <Flower className="size-4 shrink-0" />

                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

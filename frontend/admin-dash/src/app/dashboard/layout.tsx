
import Dashboard from "@/components/dashboard-layout"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { fetchUserDetails, fetchUserModules, fetchUserTeams } from "@/lib/actions"
import { SidebarData } from "@/lib/definitions"

// TODO: handle user prefrences for the dashboard 
// TODO: make dynamic breadcrumbs 
export default async function Layout({children}: {children: React.ReactNode}) {
  const user_details = await fetchUserDetails()
  const user_teams = await fetchUserTeams()
  const user_modules_base = await fetchUserModules()

  const user_modules : {
    title: string,
    url: string,
    icon?: string,
    isActive?: boolean,
    items?: {
        title: string,
        url: string,
    }[],
  }[] = []

  for( let um of user_modules_base) {
    const _module = {
      title: um.name,
      url: `/dashboard/${um.name}`,
      icon: um.name,
      isActive: false,
      items: [{
        title: 'view',
        url: `/dashboard/${um.name}`
      }, {
         title: 'add',
          url: `/dashboard/${um.name}/add`
      }]
    }
    user_modules.push(_module)
  }

  const sidebar_data: SidebarData = {
    user: user_details,
    teams: user_teams,
    userModules: user_modules,
  }

  return (
    <Dashboard sidebarData={sidebar_data}>
      {children}
    </Dashboard>
  )
}

import { AppRoutes } from '@/constants/routes.constant'

interface NavigationJson {
  text: string
  icon: string
  to: string
}

const navigationJson: NavigationJson[] = [
  {
    text: 'Feed',
    to: AppRoutes.HOME,
    icon: 'ic:round-dashboard',
  },
  {
    text: 'Explore',
    to: AppRoutes.EXPLORE,
    icon: 'ic:round-explore',
  },
  {
    text: 'Settings',
    to: AppRoutes.SETTINGS,
    icon: 'ic:round-settings',
  },
]

export default navigationJson

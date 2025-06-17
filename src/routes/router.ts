import { createBrowserRouter } from 'react-router'
// layouts
import { RootLayout } from '@/layouts/root-layout'
// route paths
import { ROUTE_PATHS } from '@/routes/paths'
// pages
import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'
import { Photos } from '@/pages/photos'
import { Favorites } from '@/pages/favorites'

export const router = createBrowserRouter(
  [
    {
      path: ROUTE_PATHS.home,
      Component: RootLayout,
      children: [
        {
          index: true,
          Component: Home,
        },
        {
          path: ROUTE_PATHS.photos,
          Component: Photos,
        },
        {
          path: ROUTE_PATHS.favorites,
          Component: Favorites,
        },
        {
          path: ROUTE_PATHS.notFound,
          Component: NotFound,
        },
      ],
    },
  ],
  { basename: '/abc-berkut-test-task/' }
)

import { createBrowserRouter } from 'react-router'
// layouts
import { RootLayout } from '@/layouts/root-layout'
// pages
import { Home } from '@/pages/home'
import { NotFound } from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      // {
      //   path: 'room/:id',
      //   Component: Room,
      // },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
])

import { Outlet } from 'react-router'
// components
import { Header } from '@/components/header'

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export { RootLayout }

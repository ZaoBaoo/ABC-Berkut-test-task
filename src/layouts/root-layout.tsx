import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <div>
      Шапка
      <Outlet />
      Футер
    </div>
  )
}

export { RootLayout }

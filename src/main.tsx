import './styles/index.scss'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { router } from '@/routes/router'

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)

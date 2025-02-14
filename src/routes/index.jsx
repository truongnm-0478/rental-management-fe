import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import About from '../pages/About'
import Home from '../pages/Home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'about', element: <About /> },
        ],
    },
])

export default router

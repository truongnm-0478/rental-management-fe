import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import About from '../pages/About'
import Home from '../pages/Home'
import RoomCreate from '../pages/room/RoomCreate'
import RoomDetail from '../pages/room/RoomDetail'
import RoomEdit from '../pages/room/RoomEdit'
import RoomList from '../pages/room/RoomList'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'about', element: <About /> },
            {
                path: 'rooms',
                children: [
                    { path: '', element: <RoomList /> },
                    { path: ':id', element: <RoomDetail /> }, // /rooms/:id
                    { path: 'create', element: <RoomCreate /> }, // /rooms/create
                    { path: 'edit/:id', element: <RoomEdit /> }, // /rooms/edit/:id
                ],
            },
        ],
    },
])

export default router

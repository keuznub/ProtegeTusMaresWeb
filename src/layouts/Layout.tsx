import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function Layout() {
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate("/dashboard", { replace: true })
    }, [user])

    return <div className='h-screen bg-radial from-[#334f5e]  to-[#012244] text-white'>

        <header>

        </header>
        <main>
            <Outlet />
        </main>
        <footer>

        </footer>
    </div>
}

export default Layout
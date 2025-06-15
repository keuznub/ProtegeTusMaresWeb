import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import defaultAvatar from '../assets/userIcon.png'
import { FirebaseAuthService } from '../services/FirebaseAuthService'

function DashboardLayout() {
    const { user, setUser } = useUser()
    const [profileMenuVisible, setProfileMenuVisible] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate("/", { replace: true })
    }, [user])

    const handleOnLogout = async () => {
        await FirebaseAuthService.logOut()
        setUser(null)
    }



    return <div className='bg-radial from-[#334f5e]  to-[#012244] text-white' onClick={() => profileMenuVisible && setProfileMenuVisible(false)}>
        <header className=' items-center border-b p-4 sticky top-0 z-10 bg-[#012244] flex flex-row gap-24'>
            <div className='flex flex-row gap-4 items-center cursor-pointer' onClick={() => setProfileMenuVisible(prev => !prev)}>
                <img src={user?.avatar ?? defaultAvatar} width={30} height={30} className='rounded-full' />
                <span>{user?.name}</span>
            </div>
            <div className={`absolute top-10 border flex flex-col gap-2 p-4 transition-all duration-500 bg-[#012244] rounded-2xl overflow-hidden ${profileMenuVisible ? "translate-y-5 translate-x-4 opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"}`}>
                <button className='bg-[#042f5a] cursor-pointer rounded-xl p-2' onClick={() => console.log("perfil")}>Ver perfil</button>
                <button className='bg-[#042f5a] cursor-pointer rounded-xl p-2' onClick={() => handleOnLogout()}>Cerrar sesion</button>
            </div>
            <nav className='absolute left-1/2 h-full content-center'>
                <Link className='py-4 content-center hover:bg-[#688fb6] cursor-pointer px-2 transition-colors duration-500 rounded-md' to={"/dashboard"}>Dashboard</Link>
            </nav>
        </header>
        <main className=' min-h-screen '>
            <Outlet />
        </main>
    </div>
}

export default DashboardLayout
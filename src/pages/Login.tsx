
import { useEffect, useState } from 'react'
import cofradiaIcon from '../assets/cofradiaIcon2.png'
import LoginForm from '../components/LoginForm'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../components/RegisterFrom'
import ForgotForm from '../components/ForgotForm'




function Login() {
    const [currentView, setCurrentView] = useState<"login" | "register" | "forgot">("login")
    const { user } = useUser()
    const navigate = useNavigate()

    const setCurrentViewAux = (view: "login" | "register" | "forgot") => {
        setCurrentView(view)
    }

    useEffect(() => {
        if (user) {
            navigate("/dashboard", { replace: true })
        }
    }, [user])

    return (
        <section className='flex flex-col w-fit mx-auto items-center gap-2'>
            <img src={cofradiaIcon} width={200} height={200} />
            {currentView === "login" && <LoginForm setCurrentView={setCurrentViewAux} />}
            {currentView === "register" && <RegisterForm setCurrentView={setCurrentViewAux} />}
            {currentView === "forgot" && <ForgotForm setCurrentView={setCurrentViewAux} />}
        </section>
    )
}

export default Login
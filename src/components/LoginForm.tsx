import { useState, type ChangeEvent } from 'react'
import { useUser } from '../context/UserContext'
import { FirebaseAuthService } from '../services/FirebaseAuthService'


interface UserForm {
    email: string,
    password: string
}
function LoginForm({ setCurrentView }: { setCurrentView: (view: "login" | "register" | "forgot") => void }) {
    const [userForm, setUserForm] = useState<UserForm>({ email: '', password: '' })
    const { setUser } = useUser()

    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserForm(prev => ({ ...prev, [name]: value }))
    }

    const handleOnLogin = async () => {
        try {
            const userCredential = await FirebaseAuthService.login(userForm.email, userForm.password)
            if (!userCredential) return
            if (!userCredential?.user.emailVerified) setUser({ id: userCredential.user.uid, avatar: userCredential.user.photoURL!, email: userCredential.user.email!, name: userCredential.user.displayName! })

        } catch (e: any) {
            window.alert("Acceso denegado")
        }

    }

    const handleOnGoogleLogin = async () => {
        try {
            const userCredential = await FirebaseAuthService.googleLogin()
            console.log("user credential login", userCredential);
            if (!userCredential) return
            if (userCredential?.user.emailVerified) setUser({ id: userCredential.user.uid, avatar: userCredential.user.photoURL!, email: userCredential.user.email!, name: userCredential.user.displayName! })
        } catch (e: any) {
            window.alert("Acceso denegado")
        }
    }


    return <>
        <h1 className='text-2xl'>Login</h1>
        <form className='flex flex-col items-center gap-2'>
            <input type='email' placeholder='Correo Electrónico' name='email' className='border rounded-xl shadow p-2' onChange={handleOnInputChange} value={userForm.email} />
            <input type='password' placeholder='Contraseña' name='password' className='border rounded-xl shadow p-2' onChange={handleOnInputChange} value={userForm.password} />
            <h4 className='text-blue-500 hover:text-blue-600 cursor-pointer font-bold' onClick={() => setCurrentView("forgot")}>Has olvidado la contraseña</h4>
            <h4 className='text-blue-500 hover:text-blue-600 cursor-pointer font-bold' onClick={() => setCurrentView("register")}>Registrarme</h4>
            <input type='button' value="Iniciar sesion" className=' rounded-xl shadow p-2 w-full bg-blue-300 hover:bg-blue-400 cursor-pointer' onClick={handleOnLogin} />
            <input type='button' value='Iniciar sesion con Google' className=' rounded-xl shadow p-2 w-full bg-blue-300 hover:bg-blue-400 cursor-pointer' onClick={handleOnGoogleLogin} />

        </form>

    </>
}

export default LoginForm
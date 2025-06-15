import { useState, type ChangeEvent } from 'react'

import { FirebaseAuthService } from '../services/FirebaseAuthService'


interface UserForm {
    email: string,
    password: string
}
function ForgotForm({ setCurrentView }: { setCurrentView: (view: "login" | "register" | "forgot") => void }) {
    const [userForm, setUserForm] = useState<UserForm>({ email: '', password: '' })


    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserForm(prev => ({ ...prev, [name]: value }))
    }

    const handleOnForgot = async () => {
        const result = await FirebaseAuthService.forgot(userForm.email)
        if (result) setCurrentView("login")
    }


    return <>
        <h1 className='text-2xl'>Restablecer Contraseña</h1>
        <form className='flex flex-col items-center gap-2'>
            <input type='email' placeholder='Correo Electrónico' name='email' className='border rounded-xl shadow p-2' onChange={handleOnInputChange} value={userForm.email} />
            <h4 className='text-blue-500 hover:text-blue-600 cursor-pointer font-bold' onClick={() => setCurrentView("login")}>Ir a Login</h4>
            <input type='button' value="Restablecer contraseña" className=' rounded-xl shadow p-2 w-full bg-blue-300 hover:bg-blue-400 cursor-pointer' onClick={handleOnForgot} />
        </form>
    </>
}

export default ForgotForm
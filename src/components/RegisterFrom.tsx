import { useEffect, useState, type ChangeEvent } from 'react'
import { FirebaseAuthService } from '../services/FirebaseAuthService'



interface UserForm {
    email: string,
    password: string,
    confirmPassword: string
}
function RegisterForm({ setCurrentView }: { setCurrentView: (view: "login" | "register" | "forgot") => void }) {
    const [userForm, setUserForm] = useState<UserForm>({ email: '', password: '', confirmPassword: '' })
    const [emailInvalid, setEmailInvalid] = useState<boolean>(false)
    const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false)
    const [confirmPasswordInvalid, setConfirmPasswordInvalid] = useState<boolean>(false)

    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserForm(prev => ({ ...prev, [name]: value }))
    }

    const handleOnRegister = async () => {
        console.log("registering", userForm);

        const result = await FirebaseAuthService.register(userForm.email, userForm.password)
        if (result) setCurrentView("login")
    }


    useEffect(() => {
        validEmail()
    }, [userForm.email])

    useEffect(() => {
        validPassword()
    }, [userForm.password])

    useEffect(() => {
        validConfirmPassword()
    }, [userForm.confirmPassword])

    const validEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userForm?.email) return
        setEmailInvalid(!regex.test(userForm.email))
    }

    const validPassword = () => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#+\-_=.,:;])[A-Za-z\d@$!%*?&#+\-_=.,:;]{8,}$/;
        if (!userForm?.password) return
        setPasswordInvalid(!regex.test(userForm.password))
    }

    const validConfirmPassword = () => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#+\-_=.,:;])[A-Za-z\d@$!%*?&#+\-_=.,:;]{8,}$/;
        if (!userForm?.confirmPassword) return
        setConfirmPasswordInvalid(!regex.test(userForm.confirmPassword) || userForm.password !== userForm.confirmPassword)
    }




    return <>
        <h1 className='text-2xl'>Registro</h1>
        <form className='flex flex-col items-center gap-2'>
            <input type='email' placeholder='Correo Electrónico' name='email' className={`border rounded-xl shadow p-2 ${emailInvalid ? "border-red-500 outline-red-500" : ""}`} onChange={handleOnInputChange} value={userForm.email} />
            <input type='password' placeholder='Contraseña' name='password' className={`border rounded-xl shadow p-2 ${passwordInvalid ? "border-red-500 outline-red-500" : ""}`} onChange={handleOnInputChange} value={userForm.password} />
            <input type='password' placeholder='Confirmar contraseña' name='confirmPassword' className={`border rounded-xl shadow p-2 ${confirmPasswordInvalid ? "border-red-500 outline-red-500" : ""}`} onChange={handleOnInputChange} value={userForm.confirmPassword} />
            <h4 className='text-blue-500 hover:text-blue-600 cursor-pointer font-bold' onClick={() => setCurrentView("login")}>Volver a Login</h4>
            <input type='button' value="Registrarse" className=' rounded-xl shadow p-2 w-full bg-blue-300 hover:bg-blue-400 cursor-pointer' onClick={handleOnRegister} />
        </form>

    </>
}

export default RegisterForm
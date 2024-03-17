'use client'

import React from "react";
import classes from './LoginForm.module.scss';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";


const LoginForm: React.FC = () => {
    const [showPassword, setPasswordShow] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const res = await signIn('credentials', { email: formData.get('email'), password: formData.get('password'), callbackUrl, redirect: false });

        console.log(res);
        
        if(!res?.ok && res?.error === 'CredentialsSignin') {
            setError('Ошибка входа. Проверьте введенные данные')
        }

        if(res?.ok && res.status === 200) {
            router.push('/dashboard')
        }
    }

    return (
        <form action={ handleSubmit} className={ classes.root }>
            <div className="flex justify-center">
                <h3 className={ classes.title }>Вход в админ панель</h3>
            </div>
            <div className={ classes.content }>
                <div className={ classes.inputWrapper }>
                    <input className={ classes.input } type="email" name="email" placeholder="Элетронная почта" required />
                </div>
                <div className={ classes.inputWrapper }> 
                    <input className={ classes.input } type={ showPassword ? 'text' : 'password' } name="password" placeholder="Пароль" required />
                    <button onClick={() => setPasswordShow(!showPassword)} type="button" className={ classes.buttonShow }>
                        { showPassword ? <FaEyeSlash color="#374957" /> : <FaEye color="#374957" /> }
                    </button>
                </div>
                <button type="submit" className={ classes.buttonSubmit }>Войти</button>
                {error && <div className={ classes.error }>{ error }</div>}
            </div>
        </form>
    )
}

export default LoginForm;
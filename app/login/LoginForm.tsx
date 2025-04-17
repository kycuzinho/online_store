'use client'

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types";
import { FiLoader } from "react-icons/fi";  // Ícone de carregamento

interface LoginFormProps{
    currentUser: SafeUser | null;
}

const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: '',
        }
    })

    const router = useRouter()

    useEffect(() => {
        if(currentUser){
            router.push('/cart')
            router.refresh();
        }
    }, [currentUser, router]);

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        
        signIn('credentials',{ 
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

            if(callback?.ok){
                router.push('/cart'); 
                router.refresh();

                toast.success('Entrou com sucesso');
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        })
    };

    if(currentUser){
        return <p className="text-center">Já está logado</p>
    }

    return ( 
        <>
            <Heading title="Login"/>

            <hr className="bg-slate-300 w-full h-px"/>
            
            <Input 
            id='email'
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            
            <Input 
            id='password'
            label="Palavra-Passe"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="password"
            />

            <Button 
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
            >
                {isLoading ? (
                    <FiLoader className="animate-spin" size={24} />  // Apenas o ícone de carregamento enquanto está carregando
                ) : (
                    'Login'  // Caso contrário, mostra o texto 'Login'
                )}
            </Button>

            <p className="text-sm">
                Não tem uma conta? <Link className="underline" href='/register'>Registar</Link>
            </p>

            <span className="px-2 text-gray-600">OU</span>
                
            <Button outline
            label="Continuar com o Google"
            icon={FcGoogle}
            onClick={() => {signIn('google')}}
            /> 
        </>
     );
}
 
export default LoginForm;

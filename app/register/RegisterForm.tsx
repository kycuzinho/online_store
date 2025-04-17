'use client'

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler,  } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from 'next-auth/react'
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import { FiLoader } from "react-icons/fi";

interface RegisterFormProps{
    currentUser: SafeUser | null;
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            name: '',
            email: '',
            password: '',
        }
    });

    const router = useRouter()

    useEffect(() => {
        if(currentUser){
            router.push('/cart')
            router.refresh();
        }
    }, [currentUser, router]);

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data).then(() => {
            toast.success('Conta Criada');

            signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if(callback?.ok){
                   router.push('/cart'); 
                   router.refresh();

                   toast.success('Entrou com sucesso');
                }

                if(callback?.error){
                    toast.error(callback.error)
                }
            })
        }).catch(() => toast.error('Alguma coisa não está certa')).finally(() => {
            setIsLoading(false)
        })
    };

    if(currentUser){
        return <p className="text-center">Já está logado</p>
    }

    return ( 
        <>
            <Heading title="Registar"/>


            <hr className="bg-slate-300 w-full h-px"/>
            <Input 
            id='name'
            label="Nome"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
            
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
                    'Registar'  
                )}
            </Button>

            <p className="text-sm">
                Já tem uma conta? <Link className="underline" href='/login'>Log In</Link>
            </p>

            <span className="px-2 text-gray-600">OU</span>
            
            <Button outline
            label="Entrar com o Google"
            icon={FcGoogle}
            onClick={() => {signIn('google')}}
            />
        </>
     );
}
 
export default RegisterForm;
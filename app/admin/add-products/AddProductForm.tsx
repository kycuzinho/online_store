'use client'

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import SelectColor from "@/app/components/inputs/SelectColor";
import TextArea from "@/app/components/inputs/TextArea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

const AddProductForm = () => {
    
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);
    const [customColors, setCustomColors] = useState<ImageType[]>([]);
    const [newColor, setNewColor] = useState("#000000"); // Valor inicial (preto)


    const addCustomColor = (name: string) => {
        if (!name) return toast.error("O nome da cor é obrigatório!");
    
        setCustomColors((prev) => [
            ...prev, 
            { color: name, colorCode: newColor, image: null }
        ]);
    };
    

    const {register, handleSubmit, setValue, watch, reset, formState:{errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
        }
    })

    const setCustomValue = useCallback((id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }, [setValue]);

    useEffect(() => {
        setCustomValue('images', images)
    },[images, setCustomValue]);

    useEffect(() => {
        if(isProductCreated){
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    },[isProductCreated, reset]);

    const onSubmit: SubmitHandler<FieldValues> = async(data) => {
        console.log('Product Data', data);
        //upload image to fb
        //save product to mongo db
        setIsLoading(true);
        let uploadedImages: UploadedImageType[] = []

        if(!data.category){
            setIsLoading(false)
            return toast.error('Nenhuma categoria selecionada')
        }

        if(!data.images || data.images.lenght === 0){
            setIsLoading(false)
            return toast.error('Nenhuma imagem selecionada')
        }

        const handleImageUploads = async () => {
            toast('A criar o produto...');
            try{
                for(const item of data.images){
                    if(item.image){
                        const fileName = new Date().getTime() + '-' + item.image.name;
                        const storage = getStorage(firebaseApp);
                        const storageRef = ref(storage, `products/${fileName}`);
                        const uploadTask = uploadBytesResumable(storageRef, item.image);

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on(
                                'state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                    }
                                },
                                (error) => {
                                    console.log('Error uploading image', error);
                                    reject(error)    
                                }, 
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })    
                                        console.log('File available at', downloadURL);
                                        resolve()
                                    }
                                    ).catch((error) => {
                                        console.log('Error getting the download URl', error)    
                                        reject(error)
                                    });
                                }
                            )
                        })
                    }
                }
            } catch(error){
                setIsLoading(false)
                console.log('Error handling image uploads', error)
                return toast.error('Ocorreu um erro ao tentar guardar a imagem')
            }
        }

        await handleImageUploads();
        const productData = {...data, images: uploadedImages, customColors: customColors} 
        
        axios.post('/api/product', productData).then(() => {
            toast.success('Produto criado');
            setIsProductCreated(true);
            router.refresh();
        }).catch((error) =>{
            toast.error('Erro a guardar o produto na db')
        }).finally(() => {
            setIsLoading(false)
        })
    };

    const category = watch('category')

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(!prev){
                return [value]
            }

            return[...prev, value]
        })
    },[]);

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(prev){
                const filteredImages = prev.filter((item) => item.color != value.color)
                return filteredImages
            }

            return prev
        })
    },[])

    return ( 
    <>
    <Heading title="Adicionar um Produto" center/>
    <Input 
        id='name'
        label="Nome"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
    />
    
    <Input 
        id='price'
        label="Preço"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
    />
    
    <Input 
        id='brand'
        label="Marca"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
    />
    
    <TextArea 
        id='description'
        label="Descrição"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
    />

    <CustomCheckBox id='inStock' register={register} label="Este produto está em stock"/>

    <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Seleciona uma categoria</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) =>{
                if(item.label === 'Todos'){
                    return null
                }

                return <div key={item.label} className="col-span">
                    <CategoryInput
                        onClick={(category) => setCustomValue('category', category)}
                        selected={category === item.label}
                        label={item.label}
                        icon = {item.icon}
                    />
                </div>
            })}
        </div>
    </div>

    <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
            <div className="font-bold">
            Seleciona uma das cores disponiveis para os produtos e adicione a imagem correspondente.
            </div>
            <div className="text-sm">
            Deve adicionar uma imagem para cada cor selecionada. Se não adicionar essa cor será ignorada.
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
        {[...colors, ...customColors].map((item, index) => (
            <SelectColor key={index} item={item} 
                addImageToState={addImageToState} 
                removeImageFromState={removeImageFromState} 
                isProductCreated={isProductCreated}
            />
        ))}
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <Input 
                    id="colorName"
                    label="Nome da Cor"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />
                <input 
                    type="color" 
                    value={newColor} 
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-[10vh] h-[5vh] border rounded"
                />
            </div>

            <Button 
                outline 
                label="Adicionar Cor" 
                onClick={() => {
                    const name = watch("colorName");
                    addCustomColor(name);
                    setValue("colorName", "");
                }}
            />
        </div>
    </div>
    <Button label={isLoading? (<FiLoader className="animate-spin" size={24} />) : 'Adicionar produto'} onClick={handleSubmit(onSubmit)}/>
    </>
    );
}
 
export default AddProductForm;
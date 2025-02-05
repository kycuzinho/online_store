import Image from "next/image";

const HomeBanner = () => {
    return ( 
        <div className="realtive bg-gradient-to-r from-sky-100 to-sky-700 mb-8 rounded-xl">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-4">Promoção de Primavera</h1>
                    <p className="text-lg md:text-xl text-white mb-2">Aproveite os discontos nos items selecionados</p>
                    <p className="text-2xl md:text-5xl text-yellow-400 font-bold">Até 80% de desconto</p>
                </div>
                <div className="w-1/3 relative aspect-video">
                    <Image
                    src='/banner-image.png'
                    fill
                    alt='Banner Img'
                    className='object-contain'
                    />
                </div>
            </div>
        </div>
     );
}
 
export default HomeBanner;
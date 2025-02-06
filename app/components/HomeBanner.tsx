import Image from "next/image";

const HomeBanner = () => {
    return ( 
        <div className="realtive bg-gradient-to-r from-sky-700 to-sky-300 mb-8 rounded-xl">
            <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Promoção de Primavera</h1>
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
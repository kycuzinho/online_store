import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import {MdFacebook} from "react-icons/md"
import {AiFillInstagram, AiFillYoutube} from "react-icons/ai"
import {FaXTwitter} from 'react-icons/fa6';

const Footer = () => {
    return ( 
    <footer className="bg-sky-900 text-slate-200 text-sm mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Categorias</h3>
                    <Link href='#'> Telemoveis </Link>
                    <Link href='#'> Portateis </Link>
                    <Link href='#'> Computadores </Link>
                    <Link href='#'> Relogios </Link>
                    <Link href='#'> Televisões </Link>
                    <Link href='#'> Acessórios </Link>
                    
                </FooterList>
                
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Serviçoes do Usuario</h3>
                    <Link href='#'> Contacte-nos </Link>
                    <Link href='#'> Politica de Envio </Link>
                    <Link href='#'> Devoluções e Entregas </Link>
                    <Link href='#'> FAQs </Link>
                </FooterList>

                <div className="w-full md:w-1/3 mb-6 md:mb-0 mr-5">
                    <h3 className="text-base font-bold mb-2">Sobre o Projeto</h3>
                    <p className="mb-2"> Blah BlahBlahBlahBlahBlahBlahBlahBlahBlahBlahBlah</p>
                    <p>&copy; {new Date().getFullYear()} Online Store. Direitos Reservados a Mim.</p>
                </div>

                <FooterList>
                    <h3 className="text-base font-bold mb-2">Redes Sociais</h3>
                    <div className="flex gap-2">
                        <Link href="#"> 
                            <MdFacebook size={24}/>
                        </Link>
                        <Link href="#"> 
                            <FaXTwitter size={24}/>
                        </Link>
                        <Link href="#"> 
                            <AiFillInstagram size={24}/>
                        </Link>
                        <Link href="#"> 
                            <AiFillYoutube size={24}/>
                        </Link>
                    </div> 
                </FooterList>
            </div>
        </Container>
    </footer>
    )
}
 
export default Footer;
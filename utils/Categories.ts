import { AiFillCode, AiOutlineBuild, AiOutlineWifi } from "react-icons/ai";
import { MdBatteryChargingFull, MdBuild, MdSensors, MdStorefront} from "react-icons/md";

export const categories = [
    {
        label: 'Todos',
        icon: MdStorefront
    },
    {
        label: 'Microcontroladores e Módulos',
        icon: AiFillCode  // Substituir por um ícone mais adequado
    },
    {
        label: 'Sensores e Atuadores',
        icon: MdSensors  // Substituir por um ícone mais adequado
    },
    {
        label: 'Componentes Básicos',
        icon: AiOutlineBuild  // Substituir por um ícone mais adequado
    },
    {
        label: 'Fontes de Alimentação e Energia',
        icon: MdBatteryChargingFull  // Substituir por um ícone mais adequado
    },
    {
        label: 'Ferramentas e Acessórios',
        icon: MdBuild  // Substituir por um ícone mais adequado
    },
    {
        label: 'Displays e Comunicação',
        icon: AiOutlineWifi  // Substituir por um ícone mais adequado
    }
]
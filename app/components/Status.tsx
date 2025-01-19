import { IconType } from "react-icons";

interface StatusProps{
    text: string,
    icon: IconType,
    bg: string;
    color: string,
}

const Status:React.FC<StatusProps> = ({ text, icon: Icon, bg, color}) => {
    return ( 
        <div className={`
            flex
            px-2
            rounded
            items-center
            gap-1
            ${bg}
            ${color}
        `}>
            {text} <Icon size={15}/>
        </div>
     );
}
 
export default Status;
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
            inline-flex
            items-center
            gap-1
            px-2
            py-1
            rounded
            ${bg}
            ${color}
        `}>
            <span className="leading-tight">{text}</span>
            <Icon size={15} />
        </div>
     );
}
 
export default Status;
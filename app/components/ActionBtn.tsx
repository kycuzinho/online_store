import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  tooltip?: string;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon: Icon, onClick, disabled, tooltip }) => {
  return (
    <div className="relative group inline-block">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          flex
          items-center
          justify-center 
          rounded 
          cursor-pointer
          w-[40px]
          h-[40px]
          text-slate-400
          border
          border-slate-400
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <Icon size={18} />
      </button>

      {tooltip && (
        <div
          className="
            absolute
            top-full
            mt-1
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            bg-gray-800
            text-white
            text-xs
            rounded
            px-2
            py-1
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            pointer-events-none
            z-50
          "
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default ActionBtn;

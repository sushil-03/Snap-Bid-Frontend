import React, { FC, useState } from "react";
type InputDefaultProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
import { IconType } from "react-icons";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";

type InputProps = {
  label?: string;
  fullWidth?: boolean;
  Icon?: IconType;
} & InputDefaultProps;

const Input: FC<InputProps> = ({
  label,
  fullWidth = false,
  className,
  Icon,
  type,
  ...inputProps
}) => {
  const [pass, showPass] = useState("password");
  const changeShowPass = () => {
    showPass(pass === "password" ? "text" : "password");
  };
  const fullWidthStyle = fullWidth ? "w-full" : "";
  return (
    // <div className="relative">
    //   <div className="absolute top-0 bottom-0 h-full pr-2 border-r-2 left-3 border-violet-700">
    //     <p className="my-3 align-middle md:my-5 item-center">{icon}</p>
    //   </div>
    //   <input
    //     className={`${fullWidthStyle} md:py-4 py-3 md:pl-14 pl-12 md:text-base text-sm pr-4 border-2   rounded-md outline-none ring-violet-600 border-gray-400 font-mono hover:shadow-[inset_-8px_-4px_20px_#46464620] hover:ring-2 transition-all ease-in-out duration-500 ${className} `}
    //     {...inputProps}
    //   />
    // </div>
    <div className="relative">
      {Icon && (
        // <div className="absolute top-0 bottom-0 h-full pr-2 border-r-2 border-gray-300 left-3">
        <div className="absolute top-0 bottom-0 hidden my-auto left-3 sm:block">
          <p className="my-3 align-middle item-center">
            <Icon size={20} className="text-slate-700 " />
          </p>
        </div>
      )}
      <input
        type={type == "text" ? "text" : pass}
        className={`${fullWidthStyle} md:py-2 py-3 md:pl-8 sm:pl-12 md:text-base text-sm pr-4   rounded-md outline-none ring-purple-200 focus:ring-4 border-2  focus:border-purple-700    font-baiMedium hover:shadow-[inset_-4px_-4px_10px_#46464620] focus:shadow-[inset_-4px_-4px_10px_#46464620] hover:ring-4 transition-all ease-in-out duration-500 ${className} pl-2 hover:border-purple-700`}
        {...inputProps}
      />
      {type === "password" && (
        <div
          onClick={changeShowPass}
          className="absolute top-0 bottom-0 my-auto right-4 "
        >
          <p className="my-3 align-middle item-center">
            {pass === "text" ? (
              <IoEyeSharp size={20} className="text-slate-700 " />
            ) : (
              <FaEyeSlash size={20} className="text-slate-700 " />
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;

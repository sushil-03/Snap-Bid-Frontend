import React, { FC, ReactNode } from "react";
type InputDefaultProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = {
  label?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
} & InputDefaultProps;

const Input: FC<InputProps> = ({
  label,
  fullWidth = false,
  className,
  icon,
  ...inputProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  return (
    <div className="relative">
      <div className="absolute top-0 bottom-0 h-full pr-2 border-r-2 left-3 border-violet-700">
        <p className="my-3 align-middle md:my-5 item-center">{icon}</p>
      </div>
      <input
        className={`${fullWidthStyle} md:py-4 py-3 md:pl-14 pl-12 md:text-base text-sm pr-4 border-2   rounded-md outline-none ring-violet-600 border-gray-400 font-mono hover:shadow-[inset_-8px_-4px_20px_#46464620] hover:ring-2 transition-all ease-in-out duration-500 ${className} `}
        {...inputProps}
      />
    </div>
  );
};

export default Input;

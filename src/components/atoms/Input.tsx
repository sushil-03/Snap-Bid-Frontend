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
      <span className="absolute pr-2 border-r-2 left-3 top-5 border-violet-700">
        {icon}
      </span>
      <input
        className={`${fullWidthStyle} py-4 pl-14 pr-4 border-2   rounded-md outline-none ring-violet-600 border-gray-400 font-baiMedium hover:shadow-[inset_-8px_-4px_20px_#46464620] hover:ring-2  ${className}`}
        {...inputProps}
      />
    </div>
  );
};

export default Input;

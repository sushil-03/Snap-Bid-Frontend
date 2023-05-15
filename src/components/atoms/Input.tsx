import React, { FC, ReactNode } from "react";
type InputDefaultProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = {
  label?: string;
  fullWidth?: boolean;
} & InputDefaultProps;

const Input: FC<InputProps> = ({
  label,
  fullWidth = false,
  className,
  ...inputProps
}) => {
  const fullWidthStyle = fullWidth ? "w-full" : "";
  return (
    <input
      className={`${fullWidthStyle} py-2 pl-10 pr-4 border-2 rounded-md outline-none border-black-600 font-baiMedium ${className}`}
      {...inputProps}
    />
  );
};

export default Input;

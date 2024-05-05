import React, { FC, ReactNode } from "react";
type DefaultButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type ButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
} & DefaultButtonProps;

const Button: FC<ButtonProps> = ({
  fullWidth = false,
  children,
  className,
  variant = "primary",
  ...buttonProps
}) => {
  const fullStyleWidth = fullWidth ? "w-full" : "";
  const getVariant = () => {
    switch (variant) {
      case "primary": {
        return "border-2 border-black-600 rounded-md md:px-6 px-3 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)]";
      }
      case "secondary": {
        return "rounded-full bg-red-500 text-white py-4 px-12 text-lg";
      }
      case "tertiary": {
        return "md:rounded-full rounded-md text-white  py-4 px-12 text-lg";
      }
      default: {
        return "";
      }
    }
  };
  const getAnimation = () => {
    switch (variant) {
      case "primary": {
        return "duration-700  hover:bg-black-600 hover:text-white";
      }
      case "secondary": {
        return "shadow-md hover:bg-red-600 duration-700 ring-red-500  hover:ring-2 hover:ring-offset-2 hover:shadow-red-100";
      }
      case "tertiary": {
        return "";
      }
      default: {
        return "";
      }
    }
  };

  return (
    <div>
      <button
        className={`${getVariant()} ${getAnimation()}  ${fullStyleWidth}  font-baiMedium shadow-red-100 shadow ease-in-out transition-all ${className}`}
        {...buttonProps}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;

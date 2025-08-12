"use client";
import React, { useState } from "react";

export interface ButtonProps {
  outline?: boolean;
  preventDbClick?: true | false;
  className?: string;
  state?: "loading" | "disable" | "default";
  type: "button" | "reset" | "submit";
  rounded?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  size: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  variant:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "surface"
    | "light"
    | "dark"
    | "transparent";
  children?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const sizeClasses: Record<ButtonProps["size"], string> = {
  "2xs": "text-xs px-2 py-1",
  xs: "text-sm px-3 py-1.5",
  sm: "text-base px-4 py-2",
  md: "text-base px-5 py-2.5",
  lg: "text-lg px-6 py-3",
  xl: "text-xl px-7 py-3.5",
  "2xl": "text-2xl px-8 py-4",
  full: "w-full text-base px-5 py-2.5",
};
const roundedClasses: Record<NonNullable<ButtonProps["rounded"]>, string> = {
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};
const variantClasses: Record<ButtonProps["variant"], string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-blue-400 text-white hover:bg-gray-700",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  info: "bg-cyan-500 text-white hover:bg-cyan-600",
  surface: "bg-white text-black border border-gray-300 hover:bg-gray-100",
  light: "bg-gray-100 text-black hover:bg-gray-200",
  dark: "bg-gray-800 text-white hover:bg-gray-900",
  transparent: "bg-transparent text-black hover:bg-gray-100",
};
const outlineVariantClasses: Record<ButtonProps["variant"], string> = {
  primary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  secondary: "border border-gray-600 text-gray-600 hover:bg-gray-100",
  success: "border border-green-600 text-green-600 hover:bg-green-50",
  danger: "border border-red-600 text-red-600 hover:bg-red-50",
  warning: "border border-yellow-500 text-yellow-500 hover:bg-yellow-100",
  info: "border border-cyan-500 text-cyan-500 hover:bg-cyan-100",
  surface: "border border-gray-300 text-black hover:bg-gray-100",
  light: "border border-white text-white hover:bg-blue-100",
  dark: "border border-gray-500 text-gray-500 hover:bg-gray-200",
  transparent: "border border-transparent text-black hover:bg-gray-100",
};
function Button(props: ButtonProps) {
  const {
    outline = false,
    preventDbClick = false,
    className = "",
    state = "default",
    type,
    rounded = "md",
    size = "md",
    variant,
    children,
    onClick,
  } = props;

  const [click, setClick] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (state === "disable" || state === "loading") return;
    if (preventDbClick && click) return;
    if (preventDbClick) {
      setClick(true);
      setTimeout(() => setClick(false), 500);
    }
    onClick(e);
  };
  const disabled = state === "disable" || click;
  const sizeStyles = sizeClasses[size];
  const roundedStyle = roundedClasses[rounded];
  const variantStyle = outline
    ? outlineVariantClasses[variant]
    : variantClasses[variant];
  const loadingIcon =
    state === "loading" ? (
      <span className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2" />
    ) : null;

  const baseButtonStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`${baseButtonStyles} ${sizeStyles} ${roundedStyle} ${variantStyle} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loadingIcon}
      {children}
    </button>
  );
}

export default Button;

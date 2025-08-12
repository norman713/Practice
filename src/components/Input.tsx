"use client";
import { useState, ChangeEvent } from "react";

interface Option {
  label: string;
  value: string;
}

export interface InputProps {
  type?: "text" | "number" | "select";
  label?: string;
  labelPlacement?: "row" | "column";
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  state?: "none" | "disabled" | "readonly" | "loading";
  icon?: React.ReactNode;
  iconPlacement?: "start" | "end";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  options?: Option[];
}

function Input(props: InputProps) {
  const {
    type = "text",
    label,
    labelPlacement = "row",
    value = "",
    onChange,
    placeholder,
    required = false,
    state,
    icon,
    iconPlacement = "end",
    className = "",
    size = "md",
    options = [],
  } = props;
  const [error, setError] = useState<string>("");

  const sizeStyles: Record<string, string> = {
    xs: "h-6 text-xs",
    sm: "h-8 text-sm",
    md: "h-9 text-base",
    lg: "h-10 text-lg",
    xl: "h-12 text-xl",
  };

  const validateInput = (inputValue: string | number): boolean => {
    if (required && !inputValue) {
      setError("This field is required");
      return false;
    }
    if (type === "number" && inputValue && isNaN(Number(inputValue))) {
      setError("Please enter a valid number");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newValue = e.target.value;
    validateInput(newValue);
    if (onChange) onChange(e);
  };

  const baseInputStyles = `w-full border rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 
    ${error ? "border-red-500" : "border-gray-300"} 
    ${state === "disabled" ? "bg-gray-100 cursor-not-allowed" : ""} 
    ${state === "readonly" ? "bg-gray-50 cursor-default" : ""} 
    ${sizeStyles[size]}
    ${icon && iconPlacement === "start" ? "pl-10" : ""} 
    ${icon && iconPlacement === "end" ? "pr-10" : ""}`;

  const containerStyles = `flex ${
    labelPlacement === "column"
      ? "flex-col gap-1"
      : "flex-row items-center gap-2"
  }`;

  const renderInput = () => {
    switch (type) {
      case "text":
      case "number":
        return (
          <input
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={state === "disabled"}
            readOnly={state === "readonly"}
            className={`${baseInputStyles} ${className}`}
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={handleChange}
            disabled={state === "disabled"}
            className={`${baseInputStyles} ${className}`}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className={containerStyles}>
      {label && (
        <label className="text-sm font-bold text-white">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative w-full">
        {icon && iconPlacement === "start" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        {renderInput()}
        {icon && iconPlacement === "end" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {icon}
          </div>
        )}
        {state === "loading" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default Input;

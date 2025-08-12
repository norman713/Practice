import React, { useEffect, useRef, useCallback } from "react";

export interface ActionButton {
  label: string;
  onClick: () => void;
}

export interface ModalProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  title: string;
  isOpen: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  actionChildren?: React.ReactNode;
  actionButtons?: ActionButton[];
  onCancel?: (event?: React.ChangeEventHandler<HTMLButtonElement>) => void;
  onConfirm?: () => void;
  setIsOpen: (value: boolean) => void;
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  full: "w-full h-full",
};

function Modal(props: ModalProps) {
  const {
    size = "md",
    title,
    isOpen,
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    actionChildren,
    actionButtons,
    onCancel,
    onConfirm,
    setIsOpen,
    children,
  } = props;

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  if (!isOpen) return null;

  // HANDLERS
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.(undefined);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-h-[90vh] flex flex-col ${sizeClasses[size]} relative`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500"
          >
            X
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-4 py-4 flex-1">{children}</div>

        {/* Footer */}
        <div className="px-4 py-3 border-t dark:border-gray-700 flex justify-end space-x-2">
          {actionChildren}
          {actionButtons?.map((btn, index) => {
            const handleBtnClick = () => btn.onClick(); // externalized here
            return (
              <button
                key={index}
                onClick={handleBtnClick}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {btn.label}
              </button>
            );
          })}
          {!actionButtons && (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {cancelLabel}
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {confirmLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;

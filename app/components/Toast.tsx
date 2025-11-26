// components/Toast.tsx
import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white font-medium
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
        animate-fade-in
      `}
    >
      {message}
    </div>
  );
}

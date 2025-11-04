// src/components/common/Toast.jsx
import { Toaster, toast } from "react-hot-toast";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

/**
 * 🔥 Komponen global toast + helper function
 * Gunakan: toastSuccess("Berhasil!"), toastError("Gagal fetch data")
 */

const Toast = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    containerStyle={{
      top: 80
    }}
    toastOptions={{
      duration: 4000,
      style: {
        padding: "12px 16px",
        borderRadius: "10px",
        fontSize: "0.875rem",
        fontWeight: 500,
      },
    }}
  />
);

export default Toast;

// ✅ Success
export const toastSuccess = (message) =>
  toast.custom(
    <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-800 rounded-lg shadow-sm px-4 py-2">
      <CheckCircle className="w-5 h-5 text-green-600" />
      <span>{message}</span>
    </div>
  );

// ⚠️ Warning
export const toastWarning = (message) =>
  toast.custom(
    <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg shadow-sm px-4 py-2">
      <AlertTriangle className="w-5 h-5 text-yellow-600" />
      <span>{message}</span>
    </div>
  );

// ❌ Error
export const toastError = (message) =>
  toast.custom(
    <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-800 rounded-lg shadow-sm px-4 py-2">
      <XCircle className="w-5 h-5 text-red-600" />
      <span>{message}</span>
    </div>
  );

// components/AuthModal.jsx
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { clearPendingAction } from "../store/authSlice";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { user, pendingAction } = useSelector((state) => state.auth);

  // Close modal and clear pending action
  const closeModal = () => {
    dispatch(clearPendingAction());
  };

  // Optional: Auto-open when pendingAction exists and no user
  if (user || !pendingAction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Join the Community</h2>
        <p className="text-gray-600 mb-6">Log in or create an account to continue.</p>

        <div className="space-y-4">
          <Link to="/auth/login" className="block w-full text-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={closeModal}>
            Log In
          </Link>
          <Link to="/auth/register" className="block w-full text-center py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={closeModal}>
            Create Account
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default AuthModal;

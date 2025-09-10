// context/AuthModalContext.jsx
import React, { createContext, useState } from "react";
import AuthModal from "../components/AuthModal";

export const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onSuccess, setOnSuccess] = useState(null);

  const openAuthModal = (callback) => {
    setOnSuccess(() => callback || null);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
    setOnSuccess(null);
  };

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}
      <AuthModal isOpen={isOpen} onClose={closeAuthModal} onSuccess={onSuccess} />
    </AuthModalContext.Provider>
  );
};
// EnhancedErrorBoundary.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function AppErrorComponent({ children }) {
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  // ✅ Catch unhandled global errors
  useEffect(() => {
    const handleGlobalError = (event) => {
      setError(event.error || new Error("Unknown global error"));
      setInfo({ componentStack: "Global error handler" });
    };

    const handleUnhandledRejection = (event) => {
      setError(event.reason || new Error("Unhandled promise rejection"));
      setInfo({ componentStack: "Promise rejection" });
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  // ✅ ErrorBoundary for render errors
  class Boundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, info: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(error, info) {
      setError(error);
      setInfo(info);
      console.error("Caught by ErrorBoundary:", error, info);
    }
    render() {
      if (this.state.hasError) return null; // UI is replaced by parent
      return this.props.children;
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6">
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-red-600 mb-4">
          {process.env.NODE_ENV === "development"
            ? error.message
            : "An unexpected error occurred."}
        </p>

        {/* Retry and Back buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Retry
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>

        {/* Dev-only details */}
        {process.env.NODE_ENV === "development" && info?.componentStack && (
          <pre className="bg-gray-100 text-sm text-gray-700 mt-6 p-4 rounded-lg overflow-auto max-w-xl">
            {info.componentStack}
          </pre>
        )}
      </div>
    );
  }

  return <Boundary>{children}</Boundary>;
}

;

import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ProtectedLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Show toast and redirect only if user is not logged in
  useEffect(() => {
    if (!user) {
      toast.error("You have to be logged in to do that action", { 
  action: {
    label: 'Go to Home',
    
    onClick: () => navigate({to:"/app"})
  },
});

      navigate({ to: "/auth/login" });
    }
  }, [user, navigate]);

  // Only render children if user is logged in
  return user ? <>{children}</> : null;
};

export default ProtectedLayout;







import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectionRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isAuthenticated && navigate(`/login`);
  }, [isAuthenticated, navigate]);

  return isAuthenticated && children;
}

export default ProtectionRoutes;

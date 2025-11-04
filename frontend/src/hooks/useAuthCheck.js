import { useEffect, useState } from "react";
import { verifyUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        setLoading(false);
        return;
      }

      const verifiedUser = await verifyUser();
      if (!verifiedUser) {
        navigate("/login");
      } else {
        setUser(verifiedUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return { user, loading };
};

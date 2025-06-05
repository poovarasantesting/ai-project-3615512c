import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Welcome() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center max-w-lg p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6">You've successfully logged in.</p>
        
        <div className="mb-8 flex justify-center">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3BjOHdvdHBtZ2pucnp1dmJvbGR1eWVkaGNzbWxxYmV1MGpiaDhtayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGGDNsLvqsBOhuU0/giphy.gif" 
            alt="Welcome celebration" 
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
        
        <Button onClick={handleLogout} variant="outline">
          Logout
        </Button>
      </div>
    </div>
  );
}
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg mb-4">
            <Heart className="w-10 h-10 text-primary-foreground" fill="currentColor" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Healthcare</h1>
          <p className="text-muted-foreground mt-2">Let's get started!</p>
          <p className="text-sm text-muted-foreground">Login to stay healthy and fit</p>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate("/signin")}
            className="w-full"
            size="lg"
          >
            Login
          </Button>
          <Button 
            onClick={() => navigate("/signup")}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

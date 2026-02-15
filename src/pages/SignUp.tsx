import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast.error("Google authentication failed");
      return;
    }
    setGoogleLoading(true);
    try {
      const result = await authService.googleLogin(credentialResponse.credential);
      if (result.success) {
        toast.success("Signed up with Google successfully!");
        navigate("/home");
      } else {
        toast.error(result.error || "Google sign-up failed");
      }
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error("Something went wrong with Google sign-up");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!agreeToTerms) {
      toast.error("Please agree to terms and conditions");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    
    try {
      const result = await authService.register(formData);
      
      if (result.success) {
        toast.success("Account created! Please check your email to verify your account.");
        // Don't auto-login - redirect to signin page
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 p-2 hover:bg-secondary rounded-full transition-smooth"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold mb-2">Sign Up</h1>
        <p className="text-muted-foreground mb-8">
          Create an account to get started
        </p>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium mb-2 block">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="h-12 rounded-2xl bg-card"
            />
          </div>

          <div>
            <Label htmlFor="lastName" className="text-sm font-medium mb-2 block">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="h-12 rounded-2xl bg-card"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-2 block">
              Enter your email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 rounded-2xl bg-card"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium mb-2 block">
              Make your password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Make your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12 rounded-2xl bg-card pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox 
              id="terms" 
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
              I agree to Healthcare{" "}
              <span className="text-primary font-medium">terms of service</span> and{" "}
              <span className="text-primary font-medium">privacy policy</span>
            </Label>
          </div>

          <Button 
            onClick={handleSignUp} 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-primary font-medium"
            >
              Sign in
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-4 text-muted-foreground">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google sign-up failed")}
                theme="outline"
                size="large"
                width="100%"
                text="signup_with"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

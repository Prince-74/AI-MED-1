import { Heart, Calendar, CreditCard, HelpCircle, LogOut, ChevronRight, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Activity, label: "My Saved", path: "/saved" },
    { icon: Calendar, label: "Appointment", path: "/appointments" },
    { icon: CreditCard, label: "Payment Method", path: "/payment" },
    { icon: HelpCircle, label: "FAQs", path: "/faqs" },
    { icon: LogOut, label: "Logout", path: "/", variant: "danger" as const },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground px-6 pt-8 pb-12 rounded-b-[2rem]">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {/* User Card */}
        <Card className="p-6 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
              JD
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">John Doe</h2>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Heart className="w-4 h-4 text-accent" />
                <span className="text-2xl font-bold text-foreground">97</span>
              </div>
              <p className="text-xs text-muted-foreground">Heart Rate</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-foreground">A+</span>
              </div>
              <p className="text-xs text-muted-foreground">Blood Group</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-foreground">103</span>
              </div>
              <p className="text-xs text-muted-foreground">Weight (lbs)</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-6 mt-6 space-y-3">
        {menuItems.map((item) => (
          <Card
            key={item.label}
            className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-card-hover transition-smooth"
            onClick={() => navigate(item.path)}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              item.variant === "danger" ? "bg-destructive/10" : "bg-secondary"
            }`}>
              <item.icon className={`w-6 h-6 ${
                item.variant === "danger" ? "text-destructive" : "text-primary"
              }`} />
            </div>
            <span className={`flex-1 font-medium ${
              item.variant === "danger" ? "text-destructive" : ""
            }`}>
              {item.label}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;

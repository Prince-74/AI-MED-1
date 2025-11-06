import { ArrowLeft, Star, MapPin, Phone, Video, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import doctorFemale from "@/assets/doctor-female.jpg";

const DoctorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-b from-primary to-primary/90 rounded-b-[2rem]" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-6 w-12 h-12 bg-card rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Doctor Card */}
        <Card className="absolute -bottom-20 left-6 right-6 p-6 shadow-lg">
          <div className="flex gap-4">
            <img
              src={doctorFemale}
              alt="Dr. Yasmine"
              className="w-24 h-24 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">Dr. Yasmine</h1>
              <p className="text-muted-foreground mb-2">Cardiologist</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">4.8</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>2.5km</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="px-6 mt-28">
        {/* About */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">About</h2>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dr. Yasmine is a highly experienced cardiologist with over 15 years of practice. 
              She specializes in preventive cardiology and has helped thousands of patients maintain 
              healthy hearts through personalized care plans.
            </p>
          </Card>
        </div>

        {/* Contact Options */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Contact</h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-card-hover transition-smooth">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium">Call</span>
            </Card>
            <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-card-hover transition-smooth">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium">Video</span>
            </Card>
            <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-card-hover transition-smooth">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs font-medium">Message</span>
            </Card>
          </div>
        </div>

        {/* Working Hours */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">Working Hours</h2>
          <Card className="p-4">
            <div className="space-y-3">
              {[
                { day: "Monday - Friday", time: "09:00 AM - 05:00 PM" },
                { day: "Saturday", time: "09:00 AM - 01:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{schedule.day}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{schedule.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Book Appointment Button */}
        <Button className="w-full" size="lg">
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorDetail;

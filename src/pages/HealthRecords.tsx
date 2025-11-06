import { ArrowLeft, FileText, Download, Share2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const records = [
  {
    id: 1,
    date: "2024-01-15",
    type: "Blood Test",
    doctor: "Dr. Sarah Johnson",
    summary: "All parameters within normal range. Hemoglobin slightly elevated.",
    aiInsight: "No immediate concerns. Continue regular checkups.",
  },
  {
    id: 2,
    date: "2024-01-10",
    type: "Consultation",
    doctor: "Dr. Michael Chen",
    summary: "Seasonal allergies diagnosed. Prescribed antihistamines.",
    aiInsight: "Monitor symptoms. Avoid known allergens.",
  },
  {
    id: 3,
    date: "2023-12-20",
    type: "X-Ray Report",
    doctor: "Dr. Yasmine Ali",
    summary: "Chest X-ray clear. No abnormalities detected.",
    aiInsight: "Healthy lung function. No follow-up needed.",
  },
];

const HealthRecords = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground px-6 pt-8 pb-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center hover:bg-primary-foreground/30 transition-smooth"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Health Records</h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 mt-6">
        <div className="space-y-4">
          {records.map((record) => (
            <Card key={record.id} className="p-5 shadow-card relative">
              {/* Timeline dot */}
              <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full border-4 border-background" />
              
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">{record.type}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {record.date}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                Doctor: <span className="font-medium text-foreground">{record.doctor}</span>
              </p>

              <div className="bg-secondary rounded-xl p-3 mb-3">
                <p className="text-sm font-medium mb-1">Summary:</p>
                <p className="text-sm text-muted-foreground">{record.summary}</p>
              </div>

              <div className="bg-sky-blue-light rounded-xl p-3 mb-3">
                <p className="text-sm font-medium mb-1 flex items-center gap-1">
                  🤖 AI Insight:
                </p>
                <p className="text-sm text-muted-foreground">{record.aiInsight}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HealthRecords;

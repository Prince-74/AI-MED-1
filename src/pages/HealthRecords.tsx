import { ArrowLeft, FileText, Download, Share2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useState, useEffect } from "react";
import { reportService, Report } from "@/services/reportService";
import { useToast } from "@/hooks/use-toast";

const HealthRecords = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const userId = localStorage.getItem('userId') || 'demo-user';
      const result = await reportService.getUserReports(userId);
      
      if (result.success) {
        setReports(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load reports",
        variant: "destructive",
      });
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await reportService.deleteReport(id);
      if (result.success) {
        setReports(reports.filter(r => r._id !== id));
        toast({
          title: "Success",
          description: "Report deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete report",
        variant: "destructive",
      });
    }
  };

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
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No reports found</p>
            <Button 
              className="mt-4" 
              onClick={() => navigate('/report-analyzer')}
            >
              Upload Your First Report
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <Card key={report._id} className="p-5 shadow-card relative">
                {/* Timeline dot */}
                <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full border-4 border-background" />
                
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-bold">{report.fileName}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(report.uploadDate!).toLocaleDateString()}
                  </div>
                </div>

                {report.metadata?.patientName && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Patient: <span className="font-medium text-foreground">{report.metadata.patientName}</span>
                  </p>
                )}

                <div className="bg-secondary rounded-xl p-3 mb-3">
                  <p className="text-sm font-medium mb-1">Summary:</p>
                  <p className="text-sm text-muted-foreground">{report.summary}</p>
                </div>

                {report.parameters.length > 0 && (
                  <div className="bg-sky-blue-light rounded-xl p-3 mb-3">
                    <p className="text-sm font-medium mb-2">Parameters:</p>
                    <div className="space-y-1">
                      {report.parameters.slice(0, 3).map((param, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{param.name}</span>
                          <span className="font-medium">{param.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default HealthRecords;

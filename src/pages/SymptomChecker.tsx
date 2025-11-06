import { ArrowLeft, Mic, Thermometer, Wind, AlertCircle, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const symptoms = [
  { icon: Thermometer, label: "Fever", color: "text-red-500" },
  { icon: Wind, label: "Cough", color: "text-blue-500" },
  { icon: AlertCircle, label: "Pain", color: "text-orange-500" },
  { icon: Stethoscope, label: "Injury", color: "text-purple-500" },
];

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyzeSymptoms = () => {
    // Mock AI analysis
    setResult({
      disease: "Common Cold",
      urgency: "low",
      explanation: "Based on your symptoms, you likely have a common cold. Rest, stay hydrated, and monitor your symptoms.",
    });
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
          <h1 className="text-2xl font-bold">AI Symptom Checker</h1>
          <div className="w-12" />
        </div>
      </div>

      {/* Symptom Icons */}
      <div className="px-6 mt-6">
        <p className="text-sm text-muted-foreground mb-3">Quick select common symptoms:</p>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {symptoms.map((symptom, idx) => (
            <Card
              key={idx}
              className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-card-hover transition-smooth"
            >
              <symptom.icon className={`w-8 h-8 ${symptom.color}`} />
              <span className="text-xs text-center font-medium">{symptom.label}</span>
            </Card>
          ))}
        </div>

        {/* Input Area */}
        <Card className="p-4 mb-4 shadow-card">
          <label className="text-sm font-medium mb-2 block">Describe your symptoms:</label>
          <Textarea
            placeholder="E.g., I have fever and headache for 2 days..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-3"
            rows={4}
          />
          <div className="flex gap-2">
            <Button onClick={analyzeSymptoms} className="flex-1">
              Check My Health
            </Button>
            <Button variant="outline" size="icon">
              <Mic className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Results */}
        {result && (
          <Card className="p-5 shadow-md">
            <h3 className="font-bold text-lg mb-3">AI Analysis</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Possible Condition:</p>
                <p className="font-semibold text-lg">{result.disease}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Urgency Level:</p>
                <Badge
                  className={
                    result.urgency === "high"
                      ? "bg-red-500 text-white"
                      : result.urgency === "medium"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }
                >
                  {result.urgency.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Explanation:</p>
                <p className="text-sm leading-relaxed">{result.explanation}</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default SymptomChecker;

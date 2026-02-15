import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { Phone, User, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface MedicalHistory {
  allergies: string;
  currentMedications: string;
  chronicConditions: string;
}

interface PatientOnboardingData {
  phone: string;
  dob: string;
  gender: string;
  bloodGroup?: string;
  emergencyContact: EmergencyContact;
  medicalHistory: MedicalHistory;
}

const PatientOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PatientOnboardingData>({
    phone: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    emergencyContact: { name: "", phone: "", relationship: "" },
    medicalHistory: { allergies: "", currentMedications: "", chronicConditions: "" },
  });

  const user = authService.getUser();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmergencyChange = (field: keyof EmergencyContact, value: string) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value },
    }));
  };

  const handleMedicalChange = (field: keyof MedicalHistory, value: string) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: { ...prev.medicalHistory, [field]: value },
    }));
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.phone || !formData.dob || !formData.gender || !formData.bloodGroup) {
        toast.error("Please fill in all required fields");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.emergencyContact.name || !formData.emergencyContact.phone || !formData.emergencyContact.relationship) {
        toast.error("Please fill in all emergency contact fields");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      const result = await authService.updateProfile({
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        emergencyContact: formData.emergencyContact,
        medicalHistory: formData.medicalHistory,
      });

      if (result.success) {
        toast.success("Profile completed successfully!");
        navigate("/home");
      } else {
        toast.error(result.error || "Profile update failed");
      }
    } catch (error) {
      console.error("Profile update failed", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSkip = () => {
    navigate("/home");
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome {user?.firstName} to AI-MED
        </h1>
        <p className="text-gray-600">Complete your profile to get started</p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-colors ${
                currentStep >= step
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-gray-300 text-gray-400"
              }`}
            >
              {step}
            </div>
            {step < 3 && (
              <div
                className={`w-20 h-1 transition-colors ${
                  currentStep > step ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="font-medium">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="dob" className="font-medium">Date of Birth *</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="gender" className="font-medium">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(val) => handleSelectChange("gender", val)}
                  >
                    <SelectTrigger id="gender" className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bloodGroup" className="font-medium">Blood Group *</Label>
                  <Select
                    value={formData.bloodGroup}
                    onValueChange={(val) => handleSelectChange("bloodGroup", val)}
                  >
                    <SelectTrigger id="bloodGroup" className="mt-1">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((grp) => (
                        <SelectItem key={grp} value={grp}>
                          {grp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Phone className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Emergency Contact</h2>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                  This contact will be notified in medical emergencies.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="emergency-name" className="font-medium">Full Name *</Label>
                  <Input
                    id="emergency-name"
                    placeholder="Emergency contact name"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleEmergencyChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="emergency-phone" className="font-medium">Phone Number *</Label>
                  <Input
                    id="emergency-phone"
                    placeholder="Emergency contact phone"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleEmergencyChange("phone", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="relationship" className="font-medium">Relationship *</Label>
                  <Select
                    value={formData.emergencyContact.relationship}
                    onValueChange={(val) => handleEmergencyChange("relationship", val)}
                  >
                    <SelectTrigger id="relationship" className="mt-1">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Spouse", "Parent", "Child", "Sibling", "Friend", "Other"].map((rel) => (
                        <SelectItem key={rel} value={rel.toLowerCase()}>
                          {rel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Medical Information</h2>
              </div>

              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  This helps doctors personalize your care. Your data is confidential.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="allergies" className="font-medium">Known Allergies</Label>
                <Textarea
                  id="allergies"
                  placeholder="e.g., Penicillin, Shellfish (or 'None')"
                  value={formData.medicalHistory.allergies}
                  onChange={(e) => handleMedicalChange("allergies", e.target.value)}
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medications" className="font-medium">Current Medications</Label>
                <Textarea
                  id="medications"
                  placeholder="e.g., Aspirin 100mg daily (or 'None')"
                  value={formData.medicalHistory.currentMedications}
                  onChange={(e) => handleMedicalChange("currentMedications", e.target.value)}
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="chronic" className="font-medium">Chronic Conditions</Label>
                <Textarea
                  id="chronic"
                  placeholder="e.g., Diabetes, Hypertension (or 'None')"
                  value={formData.medicalHistory.chronicConditions}
                  onChange={(e) => handleMedicalChange("chronicConditions", e.target.value)}
                  className="mt-1 resize-none"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 pt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1 || loading}
              className="flex-1"
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  disabled={loading}
                  className="flex-1"
                >
                  Skip for Now
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Completing..." : "Complete Profile"}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Step Progress Text */}
      <div className="text-center mt-6 text-sm text-gray-600">
        Step {currentStep} of 3
      </div>
    </div>
  );
};

export default PatientOnboarding;

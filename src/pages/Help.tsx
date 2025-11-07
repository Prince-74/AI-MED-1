import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

interface FAQ {
  question: string;
  answer: string;
}

const Help = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "How do I update my health profile (weight, height, blood group)?",
      answer: "Go to your Profile page and click the 'Edit Profile' button. You can then update your blood group, height (in cm), weight (in kg), gender, and other personal information. Don't forget to click 'Save Changes' when you're done."
    },
    {
      question: "How do I upload and analyze a medical report?",
      answer: "From the Home page, tap on 'Upload Report' or navigate to the Report Analyzer. You can either take a photo of your medical report or upload an existing image. The AI will extract text from the report and provide an analysis of the findings."
    },
    {
      question: "How do I search for medicines?",
      answer: "Tap on 'Medicines' from the Home page or bottom navigation. You can search by medicine name (e.g., 'Paracetamol'), symptom (e.g., 'cough', 'fever'), or condition (e.g., 'headache', 'acidity'). Tap on any medicine to see detailed information including uses, side effects, and contraindications."
    },
    {
      question: "Where can I view my saved medical records?",
      answer: "Tap on 'My Records' from the Home page or 'Records' from the bottom navigation. Here you'll find all your uploaded medical reports with their analysis. You can download or share any report using the buttons provided."
    },
    {
      question: "Is the medicine information reliable?",
      answer: "Yes! All medicine information is sourced from verified databases including CDSCO (Central Drugs Standard Control Organisation), WHO Essential Medicines List, FDA Drug Database, and other official medical references. However, this is for educational purposes only - always consult a qualified doctor for medical advice."
    },
    {
      question: "Can I use the symptom checker for diagnosis?",
      answer: "The symptom checker is designed to help you understand potential health concerns based on your symptoms. However, it is NOT a substitute for professional medical diagnosis. Always consult a qualified healthcare provider for proper diagnosis and treatment."
    },
    {
      question: "How secure is my medical data?",
      answer: "Your medical data is stored securely in our database with encryption. We follow industry-standard security practices to protect your personal health information. Your data is only accessible to you when you're logged in."
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "On the Sign In page, click on 'Forgot Password?' (if available) or contact support. You can also create a new account if needed. Make sure to use the 'Remember Me' option when logging in to stay signed in."
    },
    {
      question: "How do I download or share my medical reports?",
      answer: "Go to 'My Records' and find the report you want to share. Each report has 'Download' and 'Share' buttons. Download saves the report as a PDF to your device, while Share lets you send it via email, messaging apps, or other sharing options."
    },
    {
      question: "What does the AI report analysis include?",
      answer: "The AI analyzes your medical report and provides: extracted text from the document, key findings and abnormalities, interpretation of test results, potential health concerns, and general recommendations. Remember, this is for informational purposes only and should not replace professional medical advice."
    },
    {
      question: "Can I edit or delete my uploaded reports?",
      answer: "Currently, you can view and download your reports from the 'My Records' section. If you need to delete a report or make changes, you can upload a new version. Each report is timestamped so you can track your health history over time."
    },
    {
      question: "Why do I need to verify my email?",
      answer: "Email verification ensures the security of your account and allows us to send you important notifications. After signing up, check your email for a verification link. You must verify your email before you can log in to the app."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground px-6 pt-8 pb-6 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Help & FAQs</h1>
          <div className="w-12" />
        </div>
        <p className="text-sm opacity-90">Find answers to common questions</p>
      </div>

      {/* FAQs */}
      <div className="px-6 mt-6 space-y-3">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className={`overflow-hidden ${
              index % 2 === 0 
                ? 'bg-primary/15 border-primary/40' 
                : 'bg-accent/15 border-accent/40'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full p-4 flex items-start justify-between gap-3 text-left transition-colors ${
                index % 2 === 0
                  ? 'hover:bg-primary/25'
                  : 'hover:bg-accent/25'
              }`}
            >
              <div className="flex-1">
                <h3 className={`font-bold mb-1 ${
                  index % 2 === 0 ? 'text-primary' : 'text-accent'
                }`}>
                  {faq.question}
                </h3>
                {openIndex === index && (
                  <p className="text-sm text-foreground mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
              <div className="flex-shrink-0 mt-1">
                {openIndex === index ? (
                  <ChevronUp className={`w-5 h-5 ${
                    index % 2 === 0 ? 'text-primary' : 'text-accent'
                  }`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${
                    index % 2 === 0 ? 'text-primary' : 'text-accent'
                  }`} />
                )}
              </div>
            </button>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <div className="px-6 mt-6 mb-6">
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-2">Still need help?</h3>
          <p className="text-sm text-muted-foreground mb-3">
            If you couldn't find the answer you're looking for, feel free to reach out to our support team.
          </p>
          <p className="text-sm text-primary font-medium">
            📧 support@ai-med.com
          </p>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Help;

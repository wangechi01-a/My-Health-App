import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { ProfileForm } from "@/components/ProfileForm";
import { PlanDisplay } from "@/components/PlanDisplay";
import { RecommendationForm } from "@/components/RecommendationForm";
import { RecommendationDisplay } from "@/components/RecommendationDisplay";
import { HistoryView } from "@/components/HistoryView";
import { UserProfile, RecommendationRequest } from "@/types/health";
import { useToast } from "@/hooks/use-toast";
import { Activity, Heart } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [weeklyPlan, setWeeklyPlan] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);

  // Monitor state changes for debugging
  useEffect(() => {
    console.log('weeklyPlan state changed:', weeklyPlan);
  }, [weeklyPlan]);

  useEffect(() => {
    console.log('recommendation state changed:', recommendation);
  }, [recommendation]);

  const handleGeneratePlan = async (profile: UserProfile) => {
    setIsLoadingPlan(true);
    try {
      console.log('Sending profile data:', profile);
      
      const response = await fetch('http://localhost:8000/plan/weekly', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to generate plan: ${response.status} ${errorText}`);
      }

      const planText = await response.text();
      console.log('Received plan text:', planText);
      console.log('Setting weeklyPlan state to:', planText);
      setWeeklyPlan(planText);
      console.log('weeklyPlan state should now be set');
      
      toast({
        title: "Success!",
        description: "Your weekly health plan has been generated.",
      });
    } catch (error) {
      console.error('Error generating plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate your plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPlan(false);
    }
  };

  const handleGetRecommendations = async (request: RecommendationRequest) => {
    setIsLoadingRecommendation(true);
    try {
      console.log('Sending recommendation request:', request);
      
      const response = await fetch('http://localhost:8000/plan/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      console.log('Recommendation response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Recommendation response error:', errorText);
        throw new Error(`Failed to get recommendations: ${response.status} ${errorText}`);
      }

      const recommendationText = await response.text();
      console.log('Received recommendation text:', recommendationText);
      setRecommendation(recommendationText);
      
      toast({
        title: "Success!",
        description: "Your health recommendations are ready.",
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  const renderContent = () => {
    console.log('renderContent - activeTab:', activeTab);
    console.log('renderContent - weeklyPlan:', weeklyPlan);
    console.log('renderContent - recommendation:', recommendation);
    
    switch (activeTab) {
      case "profile":
        console.log('Rendering profile tab, weeklyPlan exists:', !!weeklyPlan);
        return (
          <>
            {weeklyPlan ? (
              <div className="space-y-6" key={`plan-${weeklyPlan.length}`}> 
                <PlanDisplay plan={weeklyPlan} />
                <div className="text-center">
                  <button
                    onClick={() => setWeeklyPlan(null)}
                    className="text-sm text-muted-foreground hover:text-primary underline"
                  >
                    Generate a new plan
                  </button>
                </div>
              </div>
            ) : (
              <ProfileForm onSubmit={handleGeneratePlan} loading={isLoadingPlan} />
            )}
            <div style={{ background: '#fff3cd', color: '#b26a00', borderRadius: 8, padding: 16, margin: '32px auto 0', maxWidth: 480, boxShadow: '0 1px 4px #e0e0e0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontWeight: 600, fontSize: 17 }}>
                <span role="img" aria-label="bulb">💡</span> Pro Tip
              </div>
              <p style={{ fontSize: 15, opacity: 0.95, margin: 0 }}>
                Remember to stay hydrated, get adequate sleep, listen to your body, and be consistent to achieve your health goals!
              </p>
            </div>
          </>
        );
      
      case "recommendations":
        return recommendation ? (
          <div className="space-y-6">
            <RecommendationDisplay recommendation={recommendation} />
            <div className="text-center">
              <button
                onClick={() => setRecommendation(null)}
                className="text-sm text-muted-foreground hover:text-primary underline"
              >
                Get new recommendations
              </button>
            </div>
            <div style={{ background: '#fff3cd', color: '#856404', borderRadius: 6, padding: 16, marginTop: 16, fontSize: 15, border: '1px solid #ffeeba' }}>
              <strong>Important Disclaimer</strong><br />
              This AI provides general health information and suggestions only. Always consult with qualified healthcare professionals for medical advice, diagnosis, or treatment of any health condition.
            </div>
          </div>
        ) : (
          <>
            <RecommendationForm onSubmit={handleGetRecommendations} loading={isLoadingRecommendation} />
            <div style={{ background: '#fff3cd', color: '#856404', borderRadius: 6, padding: 16, marginTop: 16, fontSize: 15, border: '1px solid #ffeeba' }}>
              <strong>Important Disclaimer</strong><br />
              This AI provides general health information and suggestions only. Always consult with qualified healthcare professionals for medical advice, diagnosis, or treatment of any health condition.
            </div>
          </>
        );
      
      case "history":
        return <HistoryView />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-health rounded-2xl flex items-center justify-center animate-pulse-health">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-health bg-clip-text text-transparent">
              My Health App
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
          Begin your journey to a healthier you. Generate personalized weekly meal and workout plan. 
          </p>
        </div>

        {/* Navigation */}
        <Navigation activeTab={activeTab} onTabChange={(tab) => {
          console.log('Tab changed from', activeTab, 'to', tab);
          setActiveTab(tab);
        }} />

        {/* Content */}
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;

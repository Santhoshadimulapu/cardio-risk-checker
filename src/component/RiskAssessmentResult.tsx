import { Card } from '@/component/ui/card';
import { Badge } from '@/component/ui/badge';
import { Button } from '@/component/ui/button';
import { Progress } from '@/component/ui/progress';
import { Heart, AlertTriangle, CheckCircle, Info, ArrowLeft } from 'lucide-react';

interface HealthData {
  age: number;
  sex: string;
  chestPainType: string;
  restingBP: number;
  cholesterol: number;
  fastingBS: string;
  restingECG: string;
  maxHR: number;
  exerciseAngina: string;
  smoking: string;
  diabetes: string;
}

interface RiskAssessmentResultProps {
  data: HealthData;
  risk: string;
  score: number;
  onReset: () => void;
}

export default function RiskAssessmentResult({ data, risk, score, onReset }: RiskAssessmentResultProps) {
  const getRiskIcon = () => {
    switch (risk) {
      case 'Low Risk':
        return <CheckCircle className="h-8 w-8 text-success" />;
      case 'Moderate Risk':
        return <Info className="h-8 w-8 text-warning" />;
      case 'High Risk':
        return <AlertTriangle className="h-8 w-8 text-risk" />;
      default:
        return <Heart className="h-8 w-8 text-primary" />;
    }
  };

  const getRiskColor = () => {
    switch (risk) {
      case 'Low Risk':
        return 'success';
      case 'Moderate Risk':
        return 'warning';
      case 'High Risk':
        return 'risk';
      default:
        return 'primary';
    }
  };

  const getRiskDescription = () => {
    switch (risk) {
      case 'Low Risk':
        return 'Your assessment indicates a low risk for cardiovascular disease. Continue maintaining a healthy lifestyle with regular exercise, balanced diet, and routine checkups.';
      case 'Moderate Risk':
        return 'Your assessment shows moderate risk factors for cardiovascular disease. Consider lifestyle modifications and consult with your healthcare provider for personalized advice.';
      case 'High Risk':
        return 'Your assessment indicates elevated risk factors for cardiovascular disease. It is recommended to consult with a healthcare professional promptly for comprehensive evaluation and treatment planning.';
      default:
        return '';
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (data.smoking === 'yes') {
      recommendations.push('Consider smoking cessation programs');
    }
    
    if (data.restingBP > 140) {
      recommendations.push('Monitor and manage blood pressure');
    }
    
    if (data.cholesterol > 240) {
      recommendations.push('Work on cholesterol management through diet and/or medication');
    }
    
    if (data.diabetes === 'yes') {
      recommendations.push('Maintain proper diabetes management');
    }
    
    if (data.exerciseAngina === 'yes') {
      recommendations.push('Discuss exercise limitations with your cardiologist');
    }
    
    recommendations.push('Maintain regular physical activity as tolerated');
    recommendations.push('Follow a heart-healthy diet');
    recommendations.push('Schedule regular medical checkups');
    
    return recommendations;
  };

  const progressValue = Math.min((score / 15) * 100, 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Result Card */}
      <Card className="p-8 bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-elevated)] border-0 animate-scale-in hover:shadow-[var(--shadow-elevated)] transition-all duration-500">
        <div className="text-center space-y-6">
          <div className="flex justify-center animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="relative">
              {getRiskIcon()}
              <div className="absolute inset-0 animate-pulse-glow rounded-full"></div>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h2 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Assessment Complete</h2>
            <div className="transform hover:scale-105 transition-transform duration-200 inline-block">
              <Badge 
                variant="secondary" 
                className={`text-lg px-6 py-3 bg-${getRiskColor()}/10 text-${getRiskColor()} border-${getRiskColor()}/20 font-semibold rounded-full shadow-md`}
              >
                {risk}
              </Badge>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-muted/50 to-secondary/30 p-6 rounded-xl backdrop-blur-sm border border-border/50 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <p className="text-foreground leading-relaxed text-lg">
              {getRiskDescription()}
            </p>
          </div>

          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
              <span className="text-lg font-bold text-foreground bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">{score}/15</span>
            </div>
            <div className="relative">
              <Progress 
                value={progressValue} 
                className="h-4 bg-muted rounded-full overflow-hidden shadow-inner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations Card */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-card)] border-0 animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2 group">
          <Heart className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
          Personalized Recommendations
        </h3>
        
        <ul className="space-y-4">
          {getRecommendations().map((recommendation, index) => (
            <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-all duration-200 group animate-fade-in" style={{ animationDelay: `${0.7 + index * 0.1}s`, animationFillMode: 'both' }}>
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
              <span className="text-foreground leading-relaxed group-hover:text-primary transition-colors duration-200">{recommendation}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
        <Button 
          onClick={onReset}
          variant="outline"
          className="flex items-center gap-2 px-6 py-3 bg-card hover:bg-secondary/80 border-border hover:border-primary/50 transition-all duration-200 hover:scale-105 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
          New Assessment
        </Button>
        
        <Button 
          onClick={() => window.print()}
          className="flex-1 bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg shadow-[var(--shadow-card)] transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Print Results
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="p-4 bg-muted/30 border-muted">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          <strong>Medical Disclaimer:</strong> This assessment is for educational purposes only and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </Card>
    </div>
  );
}
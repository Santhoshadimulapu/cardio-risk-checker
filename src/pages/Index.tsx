import { useState } from 'react';
import Header from '@/component/Header';
import HealthAssessmentForm from '@/component/HealthAssessmentForm';
import RiskAssessmentResult from '@/component/RiskAssessmentResult';

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

const Index = () => {
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [riskLevel, setRiskLevel] = useState<string>('');
  const [riskScore, setRiskScore] = useState<number>(0);

  const handleAssessmentSubmit = (data: HealthData, risk: string, score: number) => {
    setHealthData(data);
    setRiskLevel(risk);
    setRiskScore(score);
  };

  const handleReset = () => {
    setHealthData(null);
    setRiskLevel('');
    setRiskScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {!healthData ? (
          <HealthAssessmentForm onAssessment={handleAssessmentSubmit} />
        ) : (
          <RiskAssessmentResult
            data={healthData}
            risk={riskLevel}
            score={riskScore}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default Index;

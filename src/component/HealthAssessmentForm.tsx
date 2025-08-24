import { useState } from 'react';
import { Card } from '@/component/ui/card';
import { Button } from '@/component/ui/button';
import { Input } from '@/component/ui/input';
import { Label } from '@/component/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/component/ui/select';
import { RadioGroup, RadioGroupItem } from '@/component/ui/radio-group';
import { Badge } from '@/component/ui/badge';
import { Heart, Activity, User, Stethoscope } from 'lucide-react';

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

interface AssessmentFormProps {
  onAssessment: (data: HealthData, risk: string, score: number) => void;
}

export default function HealthAssessmentForm({ onAssessment }: AssessmentFormProps) {
  const [formData, setFormData] = useState<HealthData>({
    age: 50,
    sex: '',
    chestPainType: '',
    restingBP: 120,
    cholesterol: 200,
    fastingBS: '',
    restingECG: '',
    maxHR: 150,
    exerciseAngina: '',
    smoking: '',
    diabetes: ''
  });

  const calculateRisk = (data: HealthData): { risk: string; score: number } => {
    let riskScore = 0;

    // Age risk
    if (data.age > 65) riskScore += 3;
    else if (data.age > 55) riskScore += 2;
    else if (data.age > 45) riskScore += 1;

    // Sex risk (males typically higher risk)
    if (data.sex === 'male') riskScore += 1;

    // Chest pain type
    if (data.chestPainType === 'typical') riskScore += 3;
    else if (data.chestPainType === 'atypical') riskScore += 2;
    else if (data.chestPainType === 'nonanginal') riskScore += 1;

    // Blood pressure
    if (data.restingBP > 160) riskScore += 3;
    else if (data.restingBP > 140) riskScore += 2;
    else if (data.restingBP > 130) riskScore += 1;

    // Cholesterol
    if (data.cholesterol > 280) riskScore += 3;
    else if (data.cholesterol > 240) riskScore += 2;
    else if (data.cholesterol > 200) riskScore += 1;

    // Fasting blood sugar
    if (data.fastingBS === 'high') riskScore += 2;

    // Resting ECG
    if (data.restingECG === 'abnormal') riskScore += 2;
    else if (data.restingECG === 'hypertrophy') riskScore += 1;

    // Max heart rate (lower is concerning)
    if (data.maxHR < 120) riskScore += 2;
    else if (data.maxHR < 140) riskScore += 1;

    // Exercise angina
    if (data.exerciseAngina === 'yes') riskScore += 2;

    // Smoking
    if (data.smoking === 'yes') riskScore += 2;

    // Diabetes
    if (data.diabetes === 'yes') riskScore += 2;

    const risk = riskScore >= 8 ? 'High Risk' : riskScore >= 4 ? 'Moderate Risk' : 'Low Risk';
    return { risk, score: riskScore };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { risk, score } = calculateRisk(formData);
    onAssessment(formData, risk, score);
  };

  const isFormValid = formData.sex && formData.chestPainType && formData.fastingBS && 
                      formData.restingECG && formData.exerciseAngina && formData.smoking && formData.diabetes;

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-secondary/20 shadow-[var(--shadow-card)] border-0 animate-fade-in hover:shadow-[var(--shadow-elevated)] transition-all duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-md animate-pulse-glow">
          <Heart className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold text-foreground">Heart Health Assessment</h2>
          <p className="text-muted-foreground">Complete the form below for your personalized risk evaluation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Demographics */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          <div className="flex items-center gap-2 mb-4 group">
            <User className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <Label htmlFor="age" className="group-hover:text-primary transition-colors duration-200">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                min="20"
                max="100"
                className="bg-card border-border focus:border-primary hover:border-primary/50 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            
            <div className="space-y-2 group">
              <Label className="group-hover:text-primary transition-colors duration-200">Sex</Label>
              <RadioGroup 
                value={formData.sex} 
                onValueChange={(value) => setFormData({...formData, sex: value})}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2 group/radio hover:scale-105 transition-transform duration-200">
                  <RadioGroupItem value="male" id="male" className="group-hover/radio:border-primary" />
                  <Label htmlFor="male" className="group-hover/radio:text-primary transition-colors duration-200">Male</Label>
                </div>
                <div className="flex items-center space-x-2 group/radio hover:scale-105 transition-transform duration-200">
                  <RadioGroupItem value="female" id="female" className="group-hover/radio:border-primary" />
                  <Label htmlFor="female" className="group-hover/radio:text-primary transition-colors duration-200">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Symptoms & Lifestyle</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="chestPain">Chest Pain Type</Label>
              <Select value={formData.chestPainType} onValueChange={(value) => setFormData({...formData, chestPainType: value})}>
                <SelectTrigger className="bg-card border-border focus:border-primary">
                  <SelectValue placeholder="Select chest pain type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No chest pain</SelectItem>
                  <SelectItem value="nonanginal">Non-anginal pain</SelectItem>
                  <SelectItem value="atypical">Atypical angina</SelectItem>
                  <SelectItem value="typical">Typical angina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Exercise Induced Angina</Label>
              <RadioGroup 
                value={formData.exerciseAngina} 
                onValueChange={(value) => setFormData({...formData, exerciseAngina: value})}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="angina-no" />
                  <Label htmlFor="angina-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="angina-yes" />
                  <Label htmlFor="angina-yes">Yes</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Current Smoker</Label>
              <RadioGroup 
                value={formData.smoking} 
                onValueChange={(value) => setFormData({...formData, smoking: value})}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="smoking-no" />
                  <Label htmlFor="smoking-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="smoking-yes" />
                  <Label htmlFor="smoking-yes">Yes</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Diabetes</Label>
              <RadioGroup 
                value={formData.diabetes} 
                onValueChange={(value) => setFormData({...formData, diabetes: value})}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="diabetes-no" />
                  <Label htmlFor="diabetes-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="diabetes-yes" />
                  <Label htmlFor="diabetes-yes">Yes</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Clinical Measurements */}
        <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="flex items-center gap-2 mb-4 group">
            <Stethoscope className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
            <h3 className="text-lg font-semibold text-foreground">Clinical Measurements</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 group">
              <Label htmlFor="bp" className="group-hover:text-primary transition-colors duration-200">Resting Blood Pressure (mmHg)</Label>
              <Input
                id="bp"
                type="number"
                value={formData.restingBP}
                onChange={(e) => setFormData({...formData, restingBP: parseInt(e.target.value)})}
                min="80"
                max="200"
                className="bg-card border-border focus:border-primary hover:border-primary/50 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            
            <div className="space-y-2 group">
              <Label htmlFor="cholesterol" className="group-hover:text-primary transition-colors duration-200">Cholesterol (mg/dl)</Label>
              <Input
                id="cholesterol"
                type="number"
                value={formData.cholesterol}
                onChange={(e) => setFormData({...formData, cholesterol: parseInt(e.target.value)})}
                min="100"
                max="400"
                className="bg-card border-border focus:border-primary hover:border-primary/50 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            
            <div className="space-y-2 group">
              <Label htmlFor="heartRate" className="group-hover:text-primary transition-colors duration-200">Maximum Heart Rate</Label>
              <Input
                id="heartRate"
                type="number"
                value={formData.maxHR}
                onChange={(e) => setFormData({...formData, maxHR: parseInt(e.target.value)})}
                min="80"
                max="220"
                className="bg-card border-border focus:border-primary hover:border-primary/50 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="fastingBS" className="group-hover:text-primary transition-colors duration-200">Fasting Blood Sugar</Label>
              <Select value={formData.fastingBS} onValueChange={(value) => setFormData({...formData, fastingBS: value})}>
                <SelectTrigger className="bg-card border-border focus:border-primary hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                  <SelectValue placeholder="Select blood sugar level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (&lt; 120 mg/dl)</SelectItem>
                  <SelectItem value="high">High (&gt; 120 mg/dl)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2 group">
              <Label htmlFor="restingECG" className="group-hover:text-primary transition-colors duration-200">Resting ECG Results</Label>
              <Select value={formData.restingECG} onValueChange={(value) => setFormData({...formData, restingECG: value})}>
                <SelectTrigger className="bg-card border-border focus:border-primary hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                  <SelectValue placeholder="Select ECG results" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="abnormal">ST-T wave abnormality</SelectItem>
                  <SelectItem value="hypertrophy">Left ventricular hypertrophy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Button 
            type="submit" 
            disabled={!isFormValid}
            className={`w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground font-semibold py-4 px-6 rounded-lg shadow-[var(--shadow-elevated)] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${!isFormValid ? '' : 'animate-pulse-glow'}`}
          >
            Calculate Risk Assessment
          </Button>
        </div>
      </form>
    </Card>
  );
}
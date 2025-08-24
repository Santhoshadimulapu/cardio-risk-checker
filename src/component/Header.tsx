import { Heart, Activity, Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary via-primary-light to-primary text-primary-foreground shadow-[var(--shadow-elevated)] relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-up">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 animate-pulse-glow">
              <Heart className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-primary-foreground/90 bg-clip-text text-transparent">
                CardioCheck
              </h1>
              <p className="text-primary-foreground/80 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                Heart Disease Risk Assessment
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="flex items-center gap-2 group hover:scale-105 transition-transform duration-200">
              <Activity className="h-5 w-5 text-primary-foreground/80 group-hover:text-white transition-colors duration-200" />
              <span className="text-sm group-hover:text-white transition-colors duration-200">Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2 group hover:scale-105 transition-transform duration-200">
              <Shield className="h-5 w-5 text-primary-foreground/80 group-hover:text-white transition-colors duration-200" />
              <span className="text-sm group-hover:text-white transition-colors duration-200">Privacy Protected</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
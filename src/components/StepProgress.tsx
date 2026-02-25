import { Check, MapPin, Armchair, User, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Perjalanan", icon: MapPin },
  { id: 2, label: "Kursi", icon: Armchair },
  { id: 3, label: "Data", icon: User },
  { id: 4, label: "Pembayaran", icon: CreditCard },
];

interface StepProgressProps {
  currentStep: number;
}

const StepProgress = ({ currentStep }: StepProgressProps) => {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto py-6">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 text-sm font-semibold",
                  isCompleted && "gradient-primary text-primary-foreground shadow-glow",
                  isCurrent && "gradient-primary text-primary-foreground shadow-glow scale-110",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors hidden sm:block",
                  (isCompleted || isCurrent) ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-4">
                <div
                  className={cn(
                    "h-0.5 rounded-full transition-all duration-500",
                    currentStep > step.id ? "gradient-primary" : "bg-muted"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;

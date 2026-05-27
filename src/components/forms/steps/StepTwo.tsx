import { Building, Home, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StepTwoProps {
  value: string | null;
  onChange: (value: string) => void;
}

const options: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "flat", label: "Flat", icon: Building },
  { id: "terraced", label: "Terraced", icon: Home },
  { id: "semi-detached", label: "Semi-detached", icon: Home },
  { id: "detached", label: "Detached", icon: Home },
  { id: "other", label: "Other", icon: HelpCircle },
];

function StepTwo({ value, onChange }: StepTwoProps) {
  return (
    <div>
      <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-white">
        Tell us about your property
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors ${
                isSelected
                  ? "border-mint-500 bg-mint-500/10"
                  : "border-carbon-600 bg-carbon-700 hover:border-carbon-500"
              }`}
            >
              <Icon
                className={`h-6 w-6 ${
                  isSelected ? "text-mint-500" : "text-carbon-300"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  isSelected ? "text-mint-500" : "text-white"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { StepTwo };

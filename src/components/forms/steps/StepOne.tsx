import { Zap, Wrench, Clock, PoundSterling } from "lucide-react";

interface StepOneProps {
  value: string | null;
  onChange: (value: string) => void;
}

const options = [
  { id: "new-boiler", label: "New Boiler", icon: Zap },
  { id: "repair", label: "Repair", icon: Wrench },
  { id: "annual-service", label: "Annual Service", icon: Clock },
  { id: "pricing-advice", label: "Pricing Advice", icon: PoundSterling },
];

function StepOne({ value, onChange }: StepOneProps) {
  return (
    <div>
      <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-white">
        What do you need today?
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

export { StepOne };

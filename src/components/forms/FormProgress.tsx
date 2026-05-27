interface FormProgressProps {
  currentStep: number;
}

function FormProgress({ currentStep }: FormProgressProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`h-1 flex-1 rounded-full ${
            step <= currentStep ? "bg-mint-500" : "bg-carbon-600"
          }`}
        />
      ))}
    </div>
  );
}

export { FormProgress };

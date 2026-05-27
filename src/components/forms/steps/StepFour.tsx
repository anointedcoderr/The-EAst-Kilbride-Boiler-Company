interface StepFourProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    message: string;
  };
  onChange: (field: string, value: string) => void;
}

function StepFour({ formData, onChange }: StepFourProps) {
  const inputClasses =
    "w-full rounded-lg border border-carbon-600 bg-carbon-700 px-4 py-3 text-white placeholder:text-carbon-400 focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none";

  return (
    <div>
      <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-white">
        Your details
      </h3>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Your name *"
          required
          className={inputClasses}
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Phone number *"
          required
          className={inputClasses}
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Email address *"
          required
          className={inputClasses}
        />
        <textarea
          value={formData.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="Any additional details (optional)"
          rows={3}
          className={inputClasses}
        />
      </div>
    </div>
  );
}

export { StepFour };

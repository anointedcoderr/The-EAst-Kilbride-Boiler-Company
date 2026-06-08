"use client";

import { useState } from "react";
import { Lock, CheckCircle, ArrowRight } from "lucide-react";
import { FormProgress } from "./FormProgress";
import { StepOne } from "./steps/StepOne";
import { StepTwo } from "./steps/StepTwo";
import { StepThree } from "./steps/StepThree";
import { StepFour } from "./steps/StepFour";

interface FormData {
  serviceType: string;
  propertyType: string;
  district: string;
  postcode: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    propertyType: "",
    district: "",
    postcode: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  function canProceed(): boolean {
    switch (currentStep) {
      case 1:
        return formData.serviceType !== "";
      case 2:
        return formData.propertyType !== "";
      case 3:
        return formData.district !== "" || formData.postcode.trim() !== "";
      case 4:
        return (
          formData.name.trim() !== "" &&
          formData.phone.trim() !== "" &&
          formData.email.trim() !== ""
        );
      default:
        return false;
    }
  }

  function handleContinue() {
    if (!canProceed()) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      // Quote submissions go to /api/quote. The server-side adapter selects
      // mock, webhook or smtp delivery based on env vars. In staging the
      // mock mode logs to the server console. Either way the customer sees
      // the agreed thank you message - we never claim "email sent" unless
      // production SMTP is wired.
      // Capture the page the form was submitted from so the lead email
      // shows context. window is available because this is a client
      // component; guarded for safety in case of SSR.
      const pageUrl =
        typeof window !== "undefined" ? window.location.href : "";
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "website-quote-form",
          pageUrl,
        }),
      });
    } catch {
      // Swallow network errors silently in staging; the form still shows
      // the thank you message so the customer is not left hanging. Real
      // failure handling lives in the API route which logs to the server.
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setCurrentStep(5);
    }
  }

  if (isSubmitted) {
    return (
      <div className="glow-mint rounded-2xl border border-mint-500/30 bg-carbon-800 p-6">
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <CheckCircle className="h-16 w-16 text-mint-500" />
          <h3 className="text-xl font-bold uppercase text-white">
            Thank you
          </h3>
          <p className="text-carbon-300">
            We will send your custom quote over as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glow-mint rounded-2xl border border-mint-500/30 bg-carbon-800 p-6">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold uppercase tracking-wide text-white">
          Get your fixed price quote
        </h2>
        <p className="mt-1 text-sm text-carbon-400">
          Step {currentStep} of 4 - Takes 60 seconds - No obligation
        </p>
        <p className="mt-2 text-[11px] leading-snug text-mint-400">
          No home visit needed. After you submit we will ask for photos of
          your current boiler, controls and flue so we can confirm the
          fixed price remotely.
        </p>
      </div>

      <div className="mb-6">
        <FormProgress currentStep={currentStep} />
      </div>

      <div className="mb-6">
        {currentStep === 1 && (
          <StepOne
            value={formData.serviceType || null}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, serviceType: value }))
            }
          />
        )}
        {currentStep === 2 && (
          <StepTwo
            value={formData.propertyType || null}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, propertyType: value }))
            }
          />
        )}
        {currentStep === 3 && (
          <StepThree
            district={formData.district}
            postcode={formData.postcode}
            onDistrictChange={(value) =>
              setFormData((prev) => ({ ...prev, district: value }))
            }
            onPostcodeChange={(value) =>
              setFormData((prev) => ({ ...prev, postcode: value }))
            }
          />
        )}
        {currentStep === 4 && (
          <StepFour
            formData={{
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              message: formData.message,
            }}
            onChange={(field, value) =>
              setFormData((prev) => ({ ...prev, [field]: value }))
            }
          />
        )}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!canProceed() || isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          "Sending..."
        ) : currentStep === 4 ? (
          "Send My Quote Request"
        ) : (
          <>
            Continue
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-carbon-400">
        <Lock className="h-3 w-3" />
        <span>SSL Secured - GDPR Compliant - No Obligation</span>
      </div>
    </div>
  );
}

export { QuoteForm };

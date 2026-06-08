"use client";

import { useState } from "react";
import { Lock, CheckCircle, ArrowRight, AlertTriangle, Phone } from "lucide-react";
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
  const [submissionFailed, setSubmissionFailed] = useState(false);
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
    setSubmissionFailed(false);

    // Bound the wait so a slow or 5xx origin can never trap the button on
    // "Sending..." forever. 15s is generous for a single SMTP send; if it
    // overruns, fall through to the visible failure UI.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let delivered = false;

    try {
      const pageUrl =
        typeof window !== "undefined" ? window.location.href : "";
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "website-quote-form",
          pageUrl,
        }),
        signal: controller.signal,
      });
      // 2xx -> server says the lead was captured (either mock log or real
      // SMTP send). Anything else (4xx, 5xx, origin 503 from Hostinger
      // during a restart) is a failure the customer needs to know about.
      delivered = res.ok;
    } catch {
      delivered = false;
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
      if (delivered) {
        setIsSubmitted(true);
        setCurrentStep(5);
      } else {
        setSubmissionFailed(true);
      }
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

  function handleRetry() {
    setSubmissionFailed(false);
    handleSubmit();
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

      {submissionFailed && (
        <div className="mb-4 rounded-lg border border-amber-400/40 bg-amber-500/10 p-4 text-left">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
            <div className="text-sm leading-relaxed text-amber-100">
              <p className="font-bold">We couldn't send your request just now.</p>
              <p className="mt-1 text-amber-100/90">
                Please try again or call us directly on{" "}
                <a
                  href="tel:01355204045"
                  className="inline-flex items-center gap-1 font-bold text-white underline underline-offset-2 hover:text-mint-300"
                >
                  <Phone className="h-3.5 w-3.5" />
                  01355 204045
                </a>
                {" "}and we will get you sorted.
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={submissionFailed ? handleRetry : handleContinue}
        disabled={!canProceed() || isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-mint-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-carbon-900 transition-colors hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          "Sending..."
        ) : submissionFailed ? (
          "Try again"
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

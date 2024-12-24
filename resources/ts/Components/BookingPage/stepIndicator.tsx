interface StepIndicatorProps {
    currentStep: number
    totalSteps: number,
    setStep: (step: number) => void
}

export const StepIndicator = ({ currentStep, totalSteps, setStep }: StepIndicatorProps) => {
    const handleStepClick = (e) => {
        setStep(e);
    }

    return (
        <div
            className="flex justify-center gap-4 mb-8"
        >
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div
                    onClick={() => handleStepClick(step)}
                    key={step}
                    className={`w-12 h-12 flex items-center justify-center rounded-lg text-lg font-semibold ${
                        step === currentStep
                            ? "bg-white shadow-lg text-orange-600"
                            : "bg-gradient-to-r from-orange-400 to-amber-500 text-white"
                    } transition-colors`}
                >
                    {step}
                </div>
            ))}
        </div>
    )
}

import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingProgress = ({ currentStep, steps }) => {
  return (
    <div className="w-full bg-card rounded-xl shadow-organic-sm p-6 mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-primary transition-organic"
            style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-organic ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="font-semibold">{stepNumber}</span>
                )}
              </div>
              <div className="text-center">
                <p
                  className={`text-sm font-medium ${
                    isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step?.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingProgress;
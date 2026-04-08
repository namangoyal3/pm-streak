import { useState } from 'react';
import OnboardingProOffer from '../components/OnboardingProOffer';

const Onboarding = () => {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <div>
      {/* Onboarding steps */}
      {completed && <OnboardingProOffer />}
    </div>
  );
};

export default Onboarding;
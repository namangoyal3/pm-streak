import { useState } from 'react';
import { getCurrentUserId } from '../lib/auth';
import CTAButton from '../components/CTAButton';

export default function Home() {
  const [user, setUser] = useState(null);
  const userId = getCurrentUserId();

  if (userId) {
    // User is logged in, redirect to dashboard or profile page
  } else {
    // User is not logged in, show CTA button
    return (
      <div>
        <h1>Welcome to PM Streak</h1>
        <p>Start your PM journey today!</p>
        <CTAButton
          label='Start Your PM Journey'
          onClick={() => window.location.href = '/login'}
        />
      </div>
    );
  }
}

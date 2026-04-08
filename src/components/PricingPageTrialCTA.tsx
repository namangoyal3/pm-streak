import Link from 'next/link';

const PricingPageTrialCTA = () => {
  return (
    <div className="mt-4">
      <Link href="/api/cron/refresh-credits?redirect=/pricing">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Try Pro for 7 days
        </button>
      </Link>
    </div>
  );
};

export default PricingPageTrialCTA;
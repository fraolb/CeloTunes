import { useEffect, useState } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { subscribeMusic } from "@/service/services";
import CeloTunesIcon from "@/public/CeloTunes.png";
import { ethers } from "ethers";
import { parseEther } from "viem";

interface Plan {
  id: string;
  label: string;
  price: string;
  displayPrice: string;
}

const plans: Plan[] = [
  {
    id: "1_month",
    label: "1 Month",
    price: "0.001",
    displayPrice: "$1",
  },
  {
    id: "3_months",
    label: "3 Months",
    price: "0.0025",
    displayPrice: "$3",
  },
  {
    id: "6_months",
    label: "6 Months",
    price: "0.0045",
    displayPrice: "$5",
  },
  {
    id: "1_year",
    label: "1 Year",
    price: "0.008",
    displayPrice: "$9",
  },
];

const Subscribe = () => {
  const { address, isConnected, chainId } = useAccount();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const MusicContract = "0xF3805e6d1320FDcD2FceD1aFc827D44E55cA0ca2";
  const MusicContractTest = "0xF3805e6d1320FDcD2FceD1aFc827D44E55cA0ca2";

  useEffect(() => {
    const handleSubscription = async () => {
      if (isConfirmed && hash) {
        console.log("Transaction successful:", hash);
        const subscriptionEnd = getSubscriptionEnd(selectedPlan!);
        const subscription = {
          address: address,
          subscriptionEnd,
        };

        try {
          const res = await subscribeMusic(subscription);
          console.log("Subscription response:", res);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000); // Hide success notification after 3 seconds
        } catch (err) {
          console.error("Subscription failed:", err);
          setShowError(true);
          setTimeout(() => setShowError(false), 3000); // Hide error notification after 3 seconds
        }
      }
    };

    handleSubscription();
  }, [isConfirmed, hash]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Hide error notification after 3 seconds
    }
  }, [error]);

  const handleSubscribe = async () => {
    if (!address) {
      return alert("Connect Wallet");
    }
    if (!selectedPlan) {
      return alert("Select a subscription plan");
    }

    const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
    if (!selectedPlanData) return alert("Invalid plan selected");

    const contractAddress =
      chainId === 42220 ? MusicContract : MusicContractTest;

    try {
      await sendTransaction({
        to: contractAddress,
        value: parseEther(`${selectedPlanData.price}`),
      });
    } catch (err) {
      console.log("Transaction error:", err);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000); // Hide error notification after 3 seconds
    }
  };

  const getSubscriptionEnd = (plan: string) => {
    const currentDate = new Date();
    switch (plan) {
      case "1_month":
        return new Date(
          currentDate.setMonth(currentDate.getMonth() + 1)
        ).toISOString();
      case "3_months":
        return new Date(
          currentDate.setMonth(currentDate.getMonth() + 3)
        ).toISOString();
      case "6_months":
        return new Date(
          currentDate.setMonth(currentDate.getMonth() + 6)
        ).toISOString();
      case "1_year":
        return new Date(
          currentDate.setFullYear(currentDate.getFullYear() + 1)
        ).toISOString();
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex justify-center ">
      {showSuccess && (
        <div
          className={`fixed top-0 left-1/2 w-3/4 transform -translate-x-1/2 mt-4 p-4 rounded shadow-lg 
            bg-green-500 text-white`}
        >
          Subscription Successful!
        </div>
      )}
      {showError && (
        <div
          className={`fixed top-0 left-1/2 w-3/4 transform -translate-x-1/2 mt-4 p-4 rounded shadow-lg 
          bg-red-500 text-white`}
        >
          Subscription Error!
        </div>
      )}
      <div className="p-8 rounded shadow-md w-96">
        <div>
          <img
            className="w-full h-20 sm:h-40 md:h-48 object-contain"
            src={CeloTunesIcon.src}
            alt="CeloTunesLogo"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Subscribe</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Select Plan:</h3>
          <div className="space-y-2">
            {plans.map((plan) => (
              <label
                key={plan.id}
                className="flex justify-between items-center"
              >
                <input
                  type="radio"
                  name="subscriptionPlan"
                  value={plan.id}
                  checked={selectedPlan === plan.id}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="mr-2"
                />
                <span className="w-11/12 flex justify-between">
                  <div>{plan.label}</div>
                  <div>{plan.displayPrice}</div>
                </span>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubscribe}
          className="w-full bg-yellow-500 text-white my-2 py-2 rounded shadow-md"
          disabled={isPending}
        >
          {isPending || isConfirming ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Subscribing...
            </div>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
    </div>
  );
};

export default Subscribe;

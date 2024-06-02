import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useAccount } from "wagmi";
import { checkSubscription } from "@/service/services";
//import { Subscription } from "@/types/music";

export interface Subscription {
  _id: string;
  address: string;
  subscriptionEnd: string;
  subscriptionStart: string;
  __v: number;
}

const SubscriptionContext = createContext<Subscription | null>(null);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const checkSubscriptionFunction = async () => {
      if (address && isConnected) {
        try {
          const checkSubscriptionData = await checkSubscription(address);
          if (checkSubscriptionData && checkSubscriptionData.length > 0) {
            setSubscription(checkSubscriptionData[0]);
          } else {
            setSubscription(null);
          }
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    };

    checkSubscriptionFunction();
  }, [address, isConnected]);

  return (
    <SubscriptionContext.Provider value={subscription}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context; // return the subscription directly
};

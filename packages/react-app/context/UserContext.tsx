import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useAccount } from "wagmi";
import { checkUser, createUser } from "@/service/services";

interface userData {
  address: string | undefined;
  name: string;
  music: any[]; // Assuming music is an array, you may replace `any` with a specific type if known
}

interface UserContextType {
  user: userData[] | null;
  setUser: Dispatch<SetStateAction<userData[] | null>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<userData[] | null>(null);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const checkUserFunction = async () => {
      if (address && isConnected) {
        try {
          const checkUserData = await checkUser(address);
          if (checkUserData) {
            setUser(checkUserData);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error checking subscription:", error);
        }
      }
    };

    checkUserFunction();
  }, [address, isConnected]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

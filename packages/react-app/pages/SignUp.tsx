import { useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { checkUser, createUser } from "@/service/services";
import { useUser } from "@/context/UserContext";

const SignUp = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    if (address) {
      try {
        const existingUser = await checkUser(address);
        if (existingUser) {
          setError("User with this address already exists.");
          setLoading(false);
          return;
        }

        const newUser = await createUser({ address, name });
        if (!newUser) {
          throw new Error("Failed to create user.");
        }

        setUser(newUser);
        router.push("/"); // Redirect to home page after successful signup
      } catch (error) {
        setError("Failed to create user. Please try again.");
        console.error("Error during signup:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const truncateAddress = (address: `0x${string}` | undefined) => {
    if (!address) return "";
    const start = address.slice(0, 6); // First 6 characters
    const end = address.slice(-4); // Last 4 characters
    return `${start}...${end}`;
  };

  return (
    <div className="flex justify-center  min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-bold font-medium">
              Address : {truncateAddress(address)}
            </label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

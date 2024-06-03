import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import { useState, useEffect, useCallback } from "react";

const Register = () => {
  const { loading, connected, account, register, revoke, lookupAddress } =
    useSocialConnect();
  const [identifier, setIdentifier] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [odisRegisteredAddress, setOdisRegisteredAddress] =
    useState<string>("");

  const checkLookupAddress = useCallback(async () => {
    const address = await lookupAddress(identifier);
    if (address) {
      setOdisRegisteredAddress(address);
    } else {
      setOdisRegisteredAddress("");
    }
  }, [lookupAddress, identifier]);

  useEffect(() => {
    if (account) {
      checkLookupAddress();
    }
  }, [account, checkLookupAddress]);

  const handleRegister = async () => {
    const response = await register(identifier);
    if (response && !response.success) {
      alert("Registration failed. Attestation already exists.");
      return;
    }

    console.log("the res is ", response);
    alert("Registered successfully");
  };

  const handleRevoke = async () => {
    await revoke(identifier);
    setStatus("Phone number revoked successfully.");
    setOdisRegisteredAddress("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Social Connect</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : connected ? (
          <div className="text-center">
            <p className="mb-4">Connected Wallet: {account}</p>
            {odisRegisteredAddress ? (
              <div>
                <p className="mb-4">
                  Phone Number Registered: {odisRegisteredAddress}
                </p>
                <button
                  onClick={handleRevoke}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Revoke Phone Number
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                >
                  Register Phone Number
                </button>
              </form>
            )}
          </div>
        ) : (
          <p className="text-center">Wallet not connected</p>
        )}
        {status && <p className="mt-4 text-center">{status}</p>}
      </div>
    </div>
  );
};

export default Register;

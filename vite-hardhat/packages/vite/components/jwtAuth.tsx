import { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { handletoken } from "../lib/providers/googleOauth.js";
import { EphemeralKey } from "../lib/types.js";
import { generateEphemeralKey } from "../lib/providers/googleOauth.js";
import createMembership from "../lib/verify/jwtverify.js";

// Define props interface for JwtAuth
interface JwtAuthProps {
  setAuthStatus: (status: boolean) => void;
}

const JwtAuth = ({ setAuthStatus }: JwtAuthProps) => {
  const [nonce, setNonce] = useState<string | null>(null);
  const [EpherealKey, setEpherealKey] = useState<EphemeralKey | null>(null);
  const [isGeneratingProof, setIsGeneratingProof] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [anonGroup, setAnonGroup] = useState<string | null>(null);

  // Function to generate nonce
  const Generatenonce = async () => {
    const EpherealKey = await generateEphemeralKey();
    let nonce = EpherealKey.ephemeralPubkeyHash.toString();
    return { nonce, EpherealKey };
  };

  // Use effect to fetch nonce and set it
  useEffect(() => {
    const fetchNonce = async () => {
      const { nonce, EpherealKey } = await Generatenonce();
      setNonce(nonce);
      console.log("nonce", nonce);
      setEpherealKey(EpherealKey);
    };
    fetchNonce();
  }, []);

  // Loading while nonce is being fetched
  if (!nonce) {
    return <div>Loading...</div>;
  }

  // Loading page when proof is being generated
  if (isGeneratingProof) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Proof is being generated</h2>
          <p className="text-gray-600">Please wait while we verify your credentials...</p>
        </div>
      </div>
    );
  }

  // Display anon group if authenticated
  if (isAuthenticated && anonGroup) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>Organisation: <span className="font-mono font-medium">{anonGroup}</span></span>
      </div>
    );
  }

  return (
    <div>
      {/* GoogleLogin component with nonce */}
      <GoogleLogin
        nonce={nonce}
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          
          try {
            // Show loading screen
            setIsGeneratingProof(true);
            
            // Generate the proof using the token
            const proof = await handletoken(
              credentialResponse.credential!,
              EpherealKey!,
              nonce
            );

            // Create membership using proof and Ephemeral Key
            const result = await createMembership(
              proof?.anonGroup,                     // groupId
              EpherealKey?.publicKey.toString(),    // ephemeralPubkey
              EpherealKey?.expiry.toDateString(),   // ephemeralPubkeyExpiry
              Array.from(proof?.proof),             // proof
              proof?.proofArgs,
              proof?.publicInputs                   // proofArgs
            );

            // Update the authentication status
            setIsAuthenticated(true);
            setAuthStatus(true);
            
            // Store the anon group
            if (proof?.anonGroup) {
              console.log(proof.anonGroup);
              setAnonGroup(proof.anonGroup);
            }
            
            // Hide loading screen
            setIsGeneratingProof(false);
          } catch (error) {
            console.error("Mail doesnt have a domain:", error);
            setIsGeneratingProof(false);
          }
        }}
        onError={() => {
          console.log("Login Failed");
          setIsGeneratingProof(false);
        }}
      />
    </div>
  );
};

export default JwtAuth;
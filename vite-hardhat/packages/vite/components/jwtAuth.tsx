import { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { handletoken } from "../lib/providers/googleOauth.js";
import { EphemeralKey } from "../lib/types.js";
import { generateEphemeralKey } from "../lib/providers/googleOauth.js";
import createMembership from "../lib/verify/jwtverify.js"

const Auth = () => {
  const [nonce, setNonce] = useState<string | null>(null);
  const [EpherealKey, setEpherealKey] = useState<EphemeralKey | null>(null);

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

  // Logout function
  const logout = () => {
    googleLogout();
  };

  // Loading while nonce is being fetched
  if (!nonce) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* GoogleLogin component with nonce */}
      <GoogleLogin
        nonce={nonce}
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          
          try {
            // Generate the proof using the token
            const proof = await handletoken(
              credentialResponse.credential!,
              EpherealKey!,
              nonce
            );

            // Create membership using proof and Ephemeral Key
            const result = await createMembership(
              proof?.anonGroup,                      // groupId
              EpherealKey?.publicKey.toString(), // ephemeralPubkey
              EpherealKey?.expiry.toDateString(),               // ephemeralPubkeyExpiry
              Array.from(proof?.proof),                       // proof
              proof?.proofArgs  ,   
              proof?.publicInputs               // proofArgs
            );

          } catch (error) {
            console.error("Mail doesnt have a domain:", error);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      
      {/* Logout button */}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
};

export default Auth;

import { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { handletoken } from "../lib/providers/googleOauth.js";
import { EphemeralKey } from "../lib/types.js";
import { generateEphemeralKey } from "../lib/providers/googleOauth.js";
const Auth = () => {
  const [nonce, setNonce] = useState<string | null>(null);

  const Generatenonce = async () => {
    const EpherealKey = await generateEphemeralKey();
    let nonce = EpherealKey.ephemeralPubkeyHash.toString();
    return { nonce, EpherealKey };
  };
  const [EpherealKey, setEpherealKey] = useState<EphemeralKey | null>(null);
  useEffect(() => {
    const fetchNonce = async () => {
      const { nonce, EpherealKey } = await Generatenonce();
      setNonce(nonce);
      console.log("nonce", nonce);
      setEpherealKey(EpherealKey);
    };
    fetchNonce(); 
  }, []);

  const logout = () => {
    googleLogout();
  };
  if (!nonce) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <GoogleLogin
        nonce={nonce}
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          await handletoken(
            credentialResponse.credential!,
            EpherealKey!,
            nonce,
          );
        }}
        onError={() => {
          console.log("Logion Failed");
        }}
      />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;

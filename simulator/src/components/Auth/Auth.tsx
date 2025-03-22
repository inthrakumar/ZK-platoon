import { useEffect, useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { handletoken } from "../../../helpers/utils/googleutils";
import { EphemeralKey } from "../../../helpers/types/types";
import { generateEphemeralKey } from "../../../helpers/utils/googleutils";
const Auth = ({password}:{
    password:string
}) => {
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
    fetchNonce(); // Call the function without destructuring
  }, [password]);

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

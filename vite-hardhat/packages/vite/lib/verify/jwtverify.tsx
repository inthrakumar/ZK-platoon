import { initVerifier } from "../lazy-modules.js";
import { splitBigIntToLimbs } from "../utils.js";
import { fetchGooglePublicKey } from "../providers/googleOauth.js";
import {pubkeyModulusFromJWK} from "../utils.js";
export default  async function createMembership(    groupId: any,
    ephemeralPubkey: any,
    ephemeralPubkeyExpiry: any,
    proof: any,
    proofArgs: any,
    publicInputs: any) {  

      const isValid = await verifyProof(
        Uint8Array.from(proof),
        {
            domain: groupId, 
            ephemeralPubkey: BigInt(ephemeralPubkey),
            ephemeralPubkeyExpiry: new Date(ephemeralPubkeyExpiry),
            proofArgs: proofArgs,
            publicInput: publicInputs
        }
      );
      return !isValid;
  
  }
  

  const verifyProof = async (
    proof: Uint8Array,
    { domain,
      ephemeralPubkey,
      ephemeralPubkeyExpiry,
    proofArgs,
publicInput}:
      {
        domain: string;
        ephemeralPubkey: bigint;
        ephemeralPubkeyExpiry: Date;
        proofArgs: any;
        publicInput:any;
      }
  ) => {
    // const PubKey = await fetchGooglePublicKey(proofArgs.keyId);
    // const jwtPubKey = await pubkeyModulusFromJWK(PubKey);
    // if (!jwtPubKey) {
    //   throw new Error(
    //     "[Google OAuth] Proof verification failed: could not validate Google public key."
    //   );
    // }
    // if (!domain || !jwtPubKey || !ephemeralPubkey || !ephemeralPubkeyExpiry) {
    //   throw new Error(
    //     "[JWT Circuit] Proof verification failed: invalid public inputs"
    //   );
    // }
    // console.log("veri");

    const { BarretenbergVerifier } = await initVerifier();

    const vkey = await import(`../../assets/jwt/circuit-vkey.json`);

    // Public Inputs = pubkey_limbs(18) + domain(64) + ephemeral_pubkey(1) + ephemeral_pubkey_expiry(1) = 84
    // let publicInputs = [];
    // console.log("veri");

    // // Push modulus limbs as 64 char hex strings (18 Fields)
    // const modulusLimbs = splitBigIntToLimbs(BigInt(jwtPubKey), 120, 18);
    // publicInput.push(
    //   ...modulusLimbs.map((s) => "0x" + s.toString(16).padStart(64, "0"))
    // );
    // console.log("veri");
    // console.log("domain")

    // // Push domain + domain length (BoundedVec of 64 bytes)
    // const domainUint8Array = new Uint8Array(64);
    // domainUint8Array.set(Uint8Array.from(new TextEncoder().encode(domain)));
    // publicInput.push(
    //   ...Array.from(domainUint8Array).map(
    //     (s) => "0x" + s.toString(16).padStart(64, "0")
    //   )
    // );
    // publicInputs.push("0x" + domain.length.toString(16).padStart(64, "0"));
    // console.log("veri");

    // // Push ephemeral pubkey (1 Field)
    // publicInputs.push("0x" + (ephemeralPubkey >> 3n).toString(16).padStart(64, "0"));
    // console.log("veri");

    // // Push ephemeral pubkey expiry (1 Field)
    // publicInputs.push("0x" + Math.floor(ephemeralPubkeyExpiry.getTime() / 1000).toString(16).padStart(64, "0"));
    // console.log("veri");

    const proofData = {
      proof: proof,
      publicInputs: publicInput,
    };
    console.log("maari");

    const verifier = new BarretenbergVerifier({
      crsPath: "../crs",
    });
    const result = await verifier.verifyUltraHonkProof(
      proofData,
      Uint8Array.from(vkey.default)
    );

    return result;
  }
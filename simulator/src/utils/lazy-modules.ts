import { type Noir } from "@noir-lang/noir_js";
import { type UltraHonkBackend, type BarretenbergVerifier } from "@aztec/bb.js";
export async function initProver() {
    if (!proverPromise) {
      proverPromise = (async () => {
        const [{ Noir }, { UltraHonkBackend }] = await Promise.all([
          import("@noir-lang/noir_js"),
          import("@aztec/bb.js"),
        ]);
        return {
          Noir,
          UltraHonkBackend,
        };
      })();
    }
    return proverPromise;
  }

  let proverPromise: Promise<{
    Noir: typeof Noir;
    UltraHonkBackend: typeof UltraHonkBackend;
  }> | null = null;
    
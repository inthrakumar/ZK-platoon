export interface EphemeralKey {
    privateKey: bigint;
    publicKey: bigint;
    salt: bigint;
    expiry: Date;
    ephemeralPubkeyHash: bigint;
  }
  export const LocalStorageKeys = {
    EphemeralKey: "ephemeralKey",
    CurrentGroupId: "currentGroupId",
    CurrentProvider: "currentProvider",
    GoogleOAuthState: "googleOAuthState",
    GoogleOAuthNonce: "googleOAuthNonce",
    DarkMode: "darkMode",
  };
  
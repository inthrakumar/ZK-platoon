export function bytesToBigInt(bytes: Uint8Array) {
  let result = BigInt(0);
  for (let i = 0; i < bytes.length; i++) {
    result = (result << BigInt(8)) + BigInt(bytes[i]);
  }
  return result;
}

export function bigIntToBytes(bigInt: bigint, length: number) {
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[length - 1 - i] = Number(bigInt >> BigInt(i * 8) & BigInt(0xff));
  }
  return bytes;
}
export function splitBigIntToLimbs(
  bigInt: bigint,
  byteLength: number,
  numLimbs: number
): bigint[] {
  const chunks: bigint[] = [];
  const mask = (1n << BigInt(byteLength)) - 1n;
  for (let i = 0; i < numLimbs; i++) {
    const chunk = (bigInt / (1n << (BigInt(i) * BigInt(byteLength)))) & mask;
    chunks.push(chunk);
  }
  return chunks;
}

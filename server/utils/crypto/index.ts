import { createHash, createSign, createVerify, generateKeyPairSync } from "crypto";
import { GenerateHashParams, SignDataParams, VerifySignatureParams } from "./types";

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

export const generateHash = ({ data }: GenerateHashParams): string => {
  return createHash('sha256').update(data).digest('hex');
};

export const signData = ({ data }: SignDataParams): string => {
  const sign = createSign("SHA256");
  sign.update(data).end();
  return sign.sign(privateKey, "hex");
};

export const verifySignature = ({ data, signature }: VerifySignatureParams): boolean => {
  const verify = createVerify("SHA256");
  verify.update(data);
  return verify.verify(publicKey, signature, "hex");
};

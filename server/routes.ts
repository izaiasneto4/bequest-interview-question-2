import express from "express";
import { createHash, createSign, createVerify, generateKeyPairSync } from "crypto";
import { currentData, updateCurrentData, updateBackupData } from "./fixtures/database";
import authenticateToken from "./middleware/authenticateToken";
import { DataRecord } from "./types";

const router = express.Router();

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const generateHash = (data: string): string => {
  return createHash('sha256').update(data).digest('hex');
};

const signData = (data: string): string => {
  const sign = createSign("SHA256");
  sign.update(data).end();
  return sign.sign(privateKey, "hex");
};

const verifySignature = (data: string, signature: string): boolean => {
  const verify = createVerify("SHA256");
  verify.update(data);
  return verify.verify(publicKey, signature, "hex");
};

router.get("/", authenticateToken, (req, res) => {
  res.json(currentData);
});

router.post("/", authenticateToken, (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ message: "Data is required" });
  }

  const hash = generateHash(data);
  const signature = signData(hash);

  const newData: DataRecord = { data, hash, signature };
  updateCurrentData(newData);
  updateBackupData(newData);

  res.sendStatus(200);
});

router.post("/verify", authenticateToken, (req, res) => {
  const { data, hash, signature } = currentData;
  const currentHash = generateHash(data);
  const valid = currentHash === hash && verifySignature(hash, signature);
  res.json({ valid });
});

export default router;

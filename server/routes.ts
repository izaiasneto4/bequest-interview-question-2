import express from "express";
import { currentData, updateCurrentData, updateBackupData } from "./fixtures/database";
import authenticateToken from "./middleware/authenticateToken";
import { DataRecord } from "./types";
import { generateHash, signData, verifySignature } from "./utils/crypto";

const router = express.Router();

router.get("/", authenticateToken, (req: express.Request, res: express.Response) => {
  res.json(currentData);
});

router.post("/", authenticateToken, (req: express.Request, res: express.Response) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: "Data is required" });
  }

  const hash = generateHash({ data });
  const signature = signData({ data });

  const newData: DataRecord = { data, hash, signature };
  updateCurrentData(newData);
  updateBackupData(newData);

  res.sendStatus(200);
});

router.post("/verify", authenticateToken, (req: express.Request, res: express.Response) => {
  const { data, hash, signature } = currentData;
  const currentHash = generateHash({ data });
  const valid = currentHash === hash && verifySignature({ data, signature });
  res.json({ valid });
});

export default router;

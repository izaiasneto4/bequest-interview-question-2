import { DataRecord } from "../types";

export let currentData: DataRecord = { data: "Hello World", hash: "", signature: "" };
export let backupData: DataRecord = { data: "", hash: "", signature: "" };

export const updateCurrentData = (newData: DataRecord) => {
  currentData = newData;
};

export const updateBackupData = (newData: DataRecord) => {
  backupData = newData;
};

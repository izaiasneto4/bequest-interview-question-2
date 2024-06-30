import React, { useEffect, useState } from "react";
import { fetchData, updateData, verifyData } from "./api/dataService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const AUTH_TOKEN = `Bearer ${process.env.REACT_APP_SECRET_KEY || "my_secret_key"}`;

const App: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await fetchData();
      setData(data);
      setIsValid(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateData = async () => {
    try {
      await updateData(data);
      await getData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleVerifyData = async () => {
    try {
      const valid = await verifyData();
      setIsValid(valid);
    } catch (error) {
      console.error("Error verifying data:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Saved Data</h1>
      <input
        style={styles.input}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleUpdateData}>
          Update Data
        </button>
        <button style={styles.button} onClick={handleVerifyData}>
          Verify Data
        </button>
      </div>
      {isValid !== null && (
        <div style={{ ...styles.message, color: isValid ? "green" : "red" }}>
          {isValid ? "Data is valid" : "Data has been tampered with"}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as const,
    gap: "20px",
    fontSize: "30px",
  },
  input: {
    fontSize: "30px",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    fontSize: "20px",
  },
  message: {
    fontSize: "20px",
  },
};

export default App;

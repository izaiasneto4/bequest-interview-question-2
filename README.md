# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached. 

**1. How does the client ensure that their data has not been tampered with?**
<br />

The client ensures that their data has not been tampered with by using cryptographic hashing and digital signatures. When data is created or updated, a SHA-256 hash of the data is generated and signed with a private key to produce a digital signature. During data retrieval or verification, the client can recompute the hash of the data and verify the digital signature using the public key. If the hash matches and the signature is valid, the data is confirmed to be untampered.

**2. If the data has been tampered with, how can the client recover the lost data?**

If the data has been tampered with, the client can recover the lost data using a backup mechanism. Each time the data is updated, a backup copy of the data, along with its hash and signature, is stored separately. In case of tampering detection, the client can restore the data from this backup, ensuring the original, untampered data is recovered and used to replace the compromised data

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance

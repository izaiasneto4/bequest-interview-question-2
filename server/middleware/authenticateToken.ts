import express from "express";


interface AuthenticateTokenParams {
  req: express.Request;
  res: express.Response;
  next: express.NextFunction;
}

/**
 * Middleware function to authenticate a token in the request headers.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {express.NextFunction} next - The next middleware function.
 * @return {void} This function does not return anything.
 */
const authenticateToken = ({ req, res, next }: AuthenticateTokenParams): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const secretKey = process.env.SECRET_KEY || "default_secret_key";

  if (token === secretKey) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default authenticateToken;


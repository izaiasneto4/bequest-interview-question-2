
export interface GenerateHashParams {
  data: string;
}

export interface SignDataParams extends GenerateHashParams { }

export interface VerifySignatureParams extends GenerateHashParams {
  signature: string;
}

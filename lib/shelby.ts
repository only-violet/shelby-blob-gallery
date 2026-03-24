import { ShelbyNodeClient } from "@shelby-protocol/sdk/node";
import {
  Network,
  Ed25519Account,
  Ed25519PrivateKey,
} from "@aptos-labs/ts-sdk";

const network =
  process.env.SHELBY_NETWORK === "MAINNET"
    ? Network.MAINNET
    : Network.TESTNET;

const shelbyClient = new ShelbyNodeClient({
  network,
  apiKey: process.env.SHELBY_API_KEY!,
});

const account = new Ed25519Account({
  privateKey: new Ed25519PrivateKey(process.env.SHELBY_PRIVATE_KEY!),
});

type UploadInput = {
  key: string;
  body: Buffer;
  contentType?: string;
};

type FileItem = {
  key: string;
  size: number;
  contentType?: string;
  updatedAt?: string;
};

export async function uploadFile({ key, body }: UploadInput) {
  await shelbyClient.upload({
    account,
    blobData: body,
    blobName: key,
    expirationMicros: (1000 * 60 * 60 * 24 * 30 + Date.now()) * 1000,
  });

  return { key };
}

export async function listFiles(): Promise<FileItem[]> {
  const c: any = shelbyClient as any;
  const res =
    (await c.list?.({ account: account.accountAddress })) 
    (await c.listBlobs?.({ account: account.accountAddress })) 
    (await c.getBlobs?.({ account: account.accountAddress })) 
    [];

  return res.map((b: any) => ({
    key: b.blobName  b.name,
    size: b.size  0,
    contentType: b.contentType  "application/octet-stream",
    updatedAt: b.updatedAt || "",
  }));
}

export async function deleteFile(key: string) {
  const c: any = shelbyClient as any;
  await c.delete?.({
    account,
    blobName: key,
  });
  return true;
}

export async function downloadBlob(key: string) {
  return await shelbyClient.download({
    account: account.accountAddress,
    blobName: key,
  });
}

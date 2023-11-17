import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/auth.ts
import jwt from 'jsonwebtoken';

const secret = 'sua_chave_secreta';

interface TokenPayload {
  userId: string;
  exp: number;
}

export function generateToken(userId: string): string {
  const token = jwt.sign({ userId }, secret, { expiresIn: '1h' });
  return token;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

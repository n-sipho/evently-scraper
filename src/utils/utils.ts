import crypto from 'crypto';
import CryptoJS from 'crypto-js';
import { User } from '../types/user';
import { sign } from 'jsonwebtoken';

export const generateRandomString = (length: number) => {
    return crypto
        .randomBytes(60)
        .toString('hex')
        .slice(0, length);
}

export const encrypt = (data: string): string => {
    const key = process.env.ENCRYPTION_KEY as string;
    const encrypted = CryptoJS.AES.encrypt(data, key).toString();
    return encrypted;
}

export const decrypt = (encryptedData: string): string => {
    const key = process.env.ENCRYPTION_KEY as string;
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

export const generateUserToken = (user: any) => {
    const secret = process.env.SECRET as string;
    const payload = JSON.stringify(user);
    const token = sign(payload, secret);
    return token;
}
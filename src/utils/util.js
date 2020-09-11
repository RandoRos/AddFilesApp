import { signatureGet } from 'portable-executable-signature';
import crypto from 'crypto';

export const isPeFile = (data) => {
  try {
    signatureGet(data);
    return true;
  } catch (err) {
    return false;
  }
};

export const generateHash = (data) => crypto.createHash('sha1').update(data).digest('hex');

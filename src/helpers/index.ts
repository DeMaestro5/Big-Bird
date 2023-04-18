import crypto from 'crypto';
const SECRET = 'BIG-BIRD-REST API';


export const random = (): string => {
  const bytes = crypto.randomBytes(128);
  return bytes.toString('base64');
}
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

import bcrypt from "bcrypt";

const config = useRuntimeConfig();
const saltRounds = config.basicAuth.saltRounds;

// Hash the password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

// Verify the password
export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

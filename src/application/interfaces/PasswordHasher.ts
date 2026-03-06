export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(pasword: string, hashed: string): Promise<boolean>;
}

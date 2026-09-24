/**
 * Security & Authentication Utilities
 * Implements salted SHA-256 cryptographic hashing via the Web Crypto API
 * Safe credential management & session tracking
 */

import { AdminUser, AuthSession } from '../types';

const STORAGE_USERS_KEY = 'akaber_admin_users_v2';
const STORAGE_SESSION_KEY = 'akaber_admin_session_v2';

// Utility to convert ArrayBuffer to Hex String
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Generates a cryptographically random salt
export function generateSalt(length = 16): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return bufferToHex(array.buffer);
}

// Hashes a plain password with a salt using SHA-256
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}:akaber_secret_shield`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

// Deterministic initial salt and pre-computed hash for initial credentials (admin / Admin@2027)
const DEFAULT_SALT = 'e4a8b7921c5f3e0984da721b0e45c8fa';
// Computed hash for "Admin@2027" with DEFAULT_SALT
let cachedDefaultHash: string | null = null;

async function getDefaultAdminHash(): Promise<string> {
  if (cachedDefaultHash) return cachedDefaultHash;
  cachedDefaultHash = await hashPassword('Admin@2027', DEFAULT_SALT);
  return cachedDefaultHash;
}

// Initialize admin accounts if not existing
export async function getAdminUsers(): Promise<AdminUser[]> {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) {
      const parsed: AdminUser[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to read admin users from storage', err);
  }

  // Seed default admin (Admin@2027) with salted hash
  const initialHash = await getDefaultAdminHash();
  const defaultAdmin: AdminUser = {
    id: 'user_admin_001',
    username: 'admin',
    email: 'admin@akaber.sa',
    role: 'administrator',
    passwordHash: initialHash,
    salt: DEFAULT_SALT,
    createdAt: new Date().toISOString(),
  };

  const defaultEditor: AdminUser = {
    id: 'user_editor_002',
    username: 'editor',
    email: 'editorial@akaber.sa',
    role: 'editor',
    passwordHash: await hashPassword('Editor@2027', DEFAULT_SALT),
    salt: DEFAULT_SALT,
    createdAt: new Date().toISOString(),
  };

  const initialList = [defaultAdmin, defaultEditor];
  saveAdminUsers(initialList);
  return initialList;
}

export function saveAdminUsers(users: AdminUser[]): void {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save admin users', err);
  }
}

// Authenticate user with username and password
export async function authenticate(username: string, passwordAttempt: string): Promise<AuthSession | null> {
  const users = await getAdminUsers();
  const normalized = username.trim().toLowerCase();
  const user = users.find((u) => u.username.toLowerCase() === normalized);

  if (!user) return null;

  const attemptedHash = await hashPassword(passwordAttempt, user.salt);
  if (attemptedHash !== user.passwordHash) {
    return null;
  }

  // Update last login
  user.lastLogin = new Date().toISOString();
  saveAdminUsers(users);

  // Create session
  const token = `akb_tok_${Date.now()}_${generateSalt(8)}`;
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

  const session: AuthSession = {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    },
    token,
    expiresAt,
  };

  try {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.error('Failed to save session', err);
  }

  return session;
}

// Get active session
export function getActiveSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (session.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

// Destroy session
export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch (err) {
    console.error('Failed to clear session', err);
  }
}

// Update admin credentials (username, email, password with salt hash)
export async function updateAdminUser(
  newUsername: string,
  newEmail: string,
  newPassword?: string,
  currentPasswordVerification?: string
): Promise<boolean> {
  const users = await getAdminUsers();
  const admin = users.find((u) => u.role === 'administrator') || users[0];
  if (!admin) return false;

  if (currentPasswordVerification) {
    const verified = (await hashPassword(currentPasswordVerification, admin.salt)) === admin.passwordHash;
    if (!verified) return false;
  }

  admin.username = newUsername;
  admin.email = newEmail;

  if (newPassword && newPassword.trim().length > 0) {
    const newSalt = generateSalt(16);
    admin.salt = newSalt;
    admin.passwordHash = await hashPassword(newPassword, newSalt);
  }

  saveAdminUsers(users);

  // Update active session if active
  const session = getActiveSession();
  if (session && session.user.id === admin.id) {
    session.user.username = newUsername;
    session.user.email = newEmail;
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error(e);
    }
  }

  return true;
}

export async function getStoredAdminUser(): Promise<AdminUser | null> {
  const users = await getAdminUsers();
  return users.find((u) => u.role === 'administrator') || users[0] || null;
}

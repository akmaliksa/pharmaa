/**
 * Secure Admin Login Form
 * Initial administrator credentials:
 * Username: admin
 * Initial password: Admin@2027
 */

import React, { useState } from 'react';
import { authenticate } from '../../utils/security';
import { useCms } from '../../context/CmsContext';
import { ArrowLeft, KeyRound, Lock, ShieldCheck, User } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const { setSession, isRtl, logActivity } = useCms();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@2027');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const session = await authenticate(username, password);
      if (session) {
        setSession(session);
        logActivity('Admin Logged In', session.user.username);
        onSuccess();
      } else {
        setError('Invalid username or password. Please verify credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-md bg-[#121212] border border-[#2B2B2B] rounded-2xl shadow-2xl p-8 text-[#F5F5F0]">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#222222]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/10 border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-wider font-bold text-white font-serif">
                Akaber Admin Portal
              </h2>
              <span className="text-[11px] text-neutral-400">Authenticated Access</span>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Credentials Notice */}
        <div className="my-5 p-3.5 bg-[#181818] border border-[#C5A880]/20 rounded-lg text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-[#C5A880] font-semibold">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Setup Credentials Pre-filled:</span>
          </div>
          <p className="text-neutral-400 text-[11px]">
            User: <code className="text-white font-mono">admin</code> | Password:{' '}
            <code className="text-white font-mono">Admin@2027</code>
          </p>
          <p className="text-[10px] text-neutral-500 pt-1">
            (Password can be modified after login in Users & Security)
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-800 rounded-lg text-xs text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-400 uppercase tracking-wider mb-1.5 font-medium">
              Administrator Username
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#C5A880] rounded text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 uppercase tracking-wider mb-1.5 font-medium">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-neutral-500 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-[#0A0A0A] border border-[#2B2B2B] focus:border-[#C5A880] rounded text-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#C5A880] hover:bg-[#D4AF37] text-black font-semibold uppercase tracking-wider rounded transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isLoading ? 'Verifying...' : 'Sign In to Admin Portal'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#202020] text-center text-[11px] text-neutral-500">
          Akaber Real Estate Development · Enterprise Content Management
        </div>
      </div>
    </div>
  );
};

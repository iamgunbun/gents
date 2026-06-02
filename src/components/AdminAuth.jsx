import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminAuth({ globalBtnClass, initialMode = 'login', onUpdateSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login', 'forgot', 'update'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMsg = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showMsg(error.message, 'error');
    setLoading(false);
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Dynamically uses the current website URL (localhost or production) for the email link return path
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
    });
    
    if (error) {
      showMsg(error.message, 'error');
    } else {
      showMsg('Password reset link sent to your email!', 'success');
      setTimeout(() => setMode('login'), 3000);
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: password });
    
    if (error) {
      showMsg(error.message, 'error');
    } else {
      showMsg('Password updated successfully! Redirecting...', 'success');
      setTimeout(() => {
        if (onUpdateSuccess) onUpdateSuccess();
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 animate-fade-in relative z-50">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#04351e] p-8 text-center border-b-4 border-[#eebf1c]">
          <img src="/Sticker.png" alt="Armoury Logo" className="w-20 h-20 mx-auto rounded-full border-2 border-[#eebf1c] shadow-md object-cover mb-4" />
          <h2 className="text-2xl font-serif font-bold text-[#eebf1c] uppercase tracking-widest">
            {mode === 'login' && 'Command Core'}
            {mode === 'forgot' && 'Reset Access'}
            {mode === 'update' && 'Secure New Key'}
          </h2>
          <p className="text-[#eebf1c]/70 text-xs font-mono mt-2 uppercase tracking-wider">
            Restricted Admin Portal
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          {message.text && (
            <div className={`p-3 rounded mb-6 text-xs font-bold uppercase tracking-wider text-center border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
              {message.text}
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">Operator Email</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c] focus:bg-white transition-colors" 
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider">Passcode</label>
                  <button type="button" onClick={() => setMode('forgot')} className="text-[10px] font-bold text-gray-400 hover:text-[#eebf1c] uppercase tracking-wider transition-colors">Forgot?</button>
                </div>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c] focus:bg-white transition-colors" 
                />
              </div>
              <button type="submit" disabled={loading} className={`${globalBtnClass} mt-4 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? 'Authenticating...' : 'Establish Connection'}
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleResetRequest} className="space-y-5">
              <p className="text-xs text-gray-500 leading-relaxed font-sans mb-4">Enter the email address associated with your admin profile. We will send a secure link to authorize a new passcode.</p>
              <div>
                <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">Account Email</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c] focus:bg-white transition-colors" 
                />
              </div>
              <button type="submit" disabled={loading} className={`${globalBtnClass} mt-4 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? 'Transmitting...' : 'Send Reset Link'}
              </button>
              <div className="text-center mt-4">
                <button type="button" onClick={() => setMode('login')} className="text-[10px] font-bold text-gray-400 hover:text-[#04351e] uppercase tracking-wider transition-colors">&larr; Return to Login</button>
              </div>
            </form>
          )}

          {/* UPDATE PASSWORD FORM (Triggered by Email Link) */}
          {mode === 'update' && (
            <form onSubmit={handleUpdatePassword} className="space-y-5">
               <p className="text-xs text-green-700 bg-green-50 border border-green-200 p-3 rounded font-bold uppercase tracking-wider mb-4 text-center">Authorization Confirmed</p>
               <div>
                <label className="block text-xs font-bold text-[#04351e] uppercase tracking-wider mb-2">Enter New Passcode</label>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-black text-sm focus:outline-none focus:border-[#eebf1c] focus:bg-white transition-colors" 
                  placeholder="Minimum 6 characters..."
                />
              </div>
              <button type="submit" disabled={loading} className={`${globalBtnClass} mt-4 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {loading ? 'Encrypting...' : 'Lock In New Password'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
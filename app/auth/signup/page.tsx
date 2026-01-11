'use client';

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      callbackURL: "/dashboard"
    },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("Request started...");
        },
        onSuccess: (ctx) => {
          console.log("User signed up successfully!", ctx.data);
          redirect("/dashboard");
        },
        onError: (ctx) => {
          console.log("Error signing up:", ctx.error);
          alert(ctx.error.message);
          setLoading(false);
        },
      }
    );
  }

  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    await authClient.signIn.social({ provider })
  }

  return (
    <div className="glass p-8 rounded-2xl shadow-xl w-full border border-brand-light/10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join us to start building your future</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="john@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-[#ff8c42] text-white font-semibold hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-orange/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </span>
          ) : "Sign Up"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#020122] text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            {/* Google Icon Placeholder or Text */}
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            {/* Github Icon Placeholder or Text */}
            GitHub
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-brand-orange hover:text-brand-light font-medium transition-colors">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;

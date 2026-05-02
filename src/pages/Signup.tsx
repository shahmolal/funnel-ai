import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    if (!data.session) {
      setMessage("Account created. Please check your email to confirm your account, then login.");
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3">
            Create account
          </p>
          <h1 className="text-4xl font-display font-bold text-gray-950">
            Start your free audits.
          </h1>
          <p className="text-gray-500 mt-4">
            Create your FunnelLens AI account and get 3 free audits.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="bg-white border border-gray-100 shadow-2xl shadow-gray-100 rounded-[2rem] p-8 space-y-5"
        >
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Full name
            </label>
            <input
              required
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="mt-2 w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Password
            </label>
            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="mt-2 w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {message && (
            <div className="p-4 rounded-2xl bg-violet-50 text-violet-700 text-sm font-medium">
              {message}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gray-950 text-white font-bold flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-violet-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
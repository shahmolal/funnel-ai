import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (!data.session) {
      setMessage("Login failed. Please check your email and password.");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-3">
            Welcome back
          </p>

          <h1 className="text-4xl font-display font-bold text-gray-950">
            Login to FunnelLens.
          </h1>

          <p className="text-gray-500 mt-4">
            Continue your funnel audits and saved reports.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white border border-gray-100 shadow-2xl shadow-gray-100 rounded-[2rem] p-8 space-y-5"
        >
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="mt-2 w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {message && (
            <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-medium">
              {message}
            </div>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 rounded-2xl bg-gray-950 text-white font-bold flex items-center justify-center gap-2 hover:bg-violet-700 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-bold text-violet-600">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
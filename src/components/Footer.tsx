import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-blue-600 rounded-md" />
              <span className="font-display font-bold text-lg tracking-tight">FunnelLens AI</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              AI-powered funnel analysis and conversion intelligence platform. Find what's killing your conversions.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-6 uppercase tracking-wider text-gray-400">Product</h4>
            <ul className="space-y-4">
              <li><FooterLink to="/">Home</FooterLink></li>
              <li><FooterLink to="/pricing">Pricing</FooterLink></li>
              <li><FooterLink to="/dashboard">Dashboard</FooterLink></li>
              <li><FooterLink to="/dashboard/new-audit">New Audit</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-6 uppercase tracking-wider text-gray-400">Company</h4>
            <ul className="space-y-4">
              <li><FooterLink to="/about">About</FooterLink></li>
              <li><FooterLink to="/blogs">Blogs</FooterLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-6 uppercase tracking-wider text-gray-400">Legal</h4>
            <ul className="space-y-4">
              <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink to="/terms">Terms of Service</FooterLink></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2026 FunnelLens AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <Link to={to} className="text-sm text-gray-600 hover:text-violet-600 transition-colors">
      {children}
    </Link>
  );
}

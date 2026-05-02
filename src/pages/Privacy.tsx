export default function Privacy() {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-[800px] mx-auto">
        <header className="mb-16 border-b border-gray-100 pb-12">
          <h1 className="text-5xl font-display font-bold mb-4 italic tracking-tight">Privacy Policy</h1>
          <p className="text-gray-400 font-medium tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            Last updated: April 27, 2026
          </p>
        </header>
        
        <div className="space-y-16">
          <section className="group">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col items-center">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded w-8 h-8 flex items-center justify-center border border-violet-100">01</span>
                <div className="w-px h-full bg-gray-100 mt-4" />
              </div>
              <div className="flex-1 space-y-4 pt-1">
                <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-violet-600 transition-colors">1. Information We Collect</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We collect personal information that you provide to us when you register for the service, express an interest in obtaining information about us or our products, or otherwise contact us.
                  </p>
                  <ul className="list-disc pl-5 mt-4 space-y-3 text-gray-600">
                    <li className="pl-2">Registration data including your name and email address.</li>
                    <li className="pl-2">Landing page URLs submitted for AI analysis.</li>
                    <li className="pl-2">Configuration choices for feedback tone and auditing preferences.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col items-center">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded w-8 h-8 flex items-center justify-center border border-violet-100">02</span>
                <div className="w-px h-full bg-gray-100 mt-4" />
              </div>
              <div className="flex-1 space-y-4 pt-1">
                <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-violet-600 transition-colors">2. How We Use Information</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    The primary use is to generate conversion-focused analysis of your landing pages using our proprietary AI models. We may also use this data to improve the accuracy of our optimization algorithms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col items-center">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded w-8 h-8 flex items-center justify-center border border-violet-100">03</span>
                <div className="w-px h-full bg-gray-100 mt-4" />
              </div>
              <div className="flex-1 space-y-4 pt-1">
                <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-violet-600 transition-colors">3. Data Storage & Security</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    We maintain administrative, technical, and physical safeguards designed to protect the personal information we maintain against accidental, unlawful or unauthorized destruction, loss, alteration, access, disclosure or use.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col items-center">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded w-8 h-8 flex items-center justify-center border border-violet-100">04</span>
                <div className="w-px h-full bg-gray-100 mt-4" />
              </div>
              <div className="flex-1 space-y-4 pt-1">
                <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-violet-600 transition-colors">4. Cookies & Tracking</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Like many businesses, we also collect information through cookies and similar technologies. We use these to understand your preferences based on previous or current site activity, which enables us to provide you with improved services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="group">
            <div className="flex gap-6">
              <div className="hidden md:flex flex-col items-center">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-1 rounded w-8 h-8 flex items-center justify-center border border-violet-100">05</span>
                <div className="w-px h-full bg-gray-100 mt-4" />
              </div>
              <div className="flex-1 space-y-4 pt-1">
                <h2 className="text-2xl font-display font-bold text-gray-900 group-hover:text-violet-600 transition-colors">5. User Rights</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Depending on where you reside, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="p-12 rounded-[2rem] bg-gray-50 border border-gray-100 mt-16">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-500 mb-6">If you have questions or comments about this policy, you may email us at:</p>
            <a href="mailto:privacy@funnellens.ai" className="inline-block text-violet-600 font-bold text-lg hover:underline underline-offset-4 decoration-2">
              privacy@funnellens.ai
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

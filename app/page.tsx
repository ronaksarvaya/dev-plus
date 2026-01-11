import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-dark overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-orange/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-light/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="space-y-16 max-w-4xl mx-auto animate-fade-in-up">
          {/* Badge */}
          <div className="inline-block glass rounded-full px-4 py-1.5 mb-4 border border-brand-light/20">
            <span className="text-brand-light text-sm font-medium tracking-wide">
              Powered by devvarena.com
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
            Dev Shopify+            
          </h1>

          

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="px-8 py-4 rounded-full bg-brand-orange text-white font-semibold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(249,105,0,0.4)] hover:shadow-[0_0_30px_rgba(249,105,0,0.6)]"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="px-8 py-4 rounded-full glass text-brand-light font-semibold text-lg hover:bg-white/5 transition-all transform hover:scale-105 border border-brand-light/30"
            >
              Sign In
            </Link>
          </div>
        </div>

        
      </main>
    </div>
  );
}

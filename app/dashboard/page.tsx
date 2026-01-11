import React from "react";
import Logout from "@/app/components/Logout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen bg-brand-dark p-8 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-light/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 animate-fade-in-up">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-orange to-brand-light bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Welcome back, {session.user.name}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Logout />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Total Projects", value: "12", color: "from-brand-orange to-[#ff8c42]" },
            { label: "Active Users", value: "2.4k", color: "from-blue-500 to-cyan-400" },
            { label: "Revenue", value: "$45k", color: "from-emerald-500 to-teal-400" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <div className={`mt-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="glass p-8 rounded-2xl animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                  <div className="w-2 h-2 rounded-full bg-brand-orange" />
                </div>
                <div>
                  <p className="text-white font-medium">New project created</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

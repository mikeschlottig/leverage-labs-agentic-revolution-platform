import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Cpu } from 'lucide-react';
import { GlowingButton } from '@/components/ui/glowing-button';
import { ThemeToggle } from '@/components/ThemeToggle';
export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden selection:bg-indigo-500/30">
      <ThemeToggle className="fixed top-6 right-6" />
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>The Agentic Revolution has arrived</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-6"
          >
            LEVERAGE_LABS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
              Agents SDK Studio
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
          >
            Build, deploy, and orchestrate autonomous AI agents on Cloudflare's 
            global network. High-performance agentic systems at the edge.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlowingButton 
              onClick={() => navigate('/app')}
              className="text-lg px-8 py-6 group"
            >
              Enter the Evolution
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </GlowingButton>
          </motion.div>
        </div>
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { icon: Zap, title: "Edge Performance", desc: "Zero latency orchestration powered by Cloudflare Durable Objects." },
            { icon: Shield, title: "Enterprise Ready", desc: "Built-in security, scaling, and persistent state management." },
            { icon: Cpu, title: "MCP Native", desc: "Connect your agents to any data source with Model Context Protocol." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-800/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
      <footer className="relative z-10 border-t border-zinc-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-zinc-500 text-sm">
          <p>© 2024 Leverage Labs. Powered by Cloudflare Agents SDK.</p>
          <p className="mt-2 text-zinc-600">AI capabilities are subject to request limits.</p>
        </div>
      </footer>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, Activity, Zap, Play, Shield, Settings, Code, FileCode } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { WORKER_LIST } from '@/lib/mock-data';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
const MOCK_CODE = `export default {
  async fetch(request, env, ctx) {
    const agent = env.AGENT.get(env.AGENT.idFromName("global"));
    return agent.fetch(request);
  },
};
export class MyAgent extends Agent {
  async onMessage(msg) {
    // Autonomous orchestration logic
    return this.orchestrate(msg);
  }
}`;
export function WorkersStudio() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Workers Studio</h1>
          <p className="text-muted-foreground">Manage the underlying serverless scripts powering your agent fleet.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Play className="h-4 w-4 mr-2" /> Deploy All</Button>
          <Button className="bg-indigo-600"><Code className="h-4 w-4 mr-2" /> New Worker</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-zinc-800 bg-zinc-900/40 overflow-hidden">
            <CardHeader className="border-b border-zinc-800 bg-zinc-900/20">
              <div className="flex items-center justify-between">
                <CardTitle>Active Workers</CardTitle>
                <Badge variant="outline">Total: {WORKER_LIST.length}</Badge>
              </div>
            </CardHeader>
            <div className="divide-y divide-zinc-800">
              {WORKER_LIST.map((worker) => (
                <div key={worker.id} className="p-4 flex items-center justify-between group hover:bg-zinc-800/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${worker.status === 'Deployed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <div>
                      <h4 className="font-bold text-sm font-mono">{worker.name}</h4>
                      <p className="text-xs text-muted-foreground">Last updated {worker.updatedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden md:block w-24 h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[...Array(10)].map((_, i) => ({ v: Math.random() }))}>
                          <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={1.5} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8">View Logs</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-indigo-400" />
                <CardTitle>Core Orchestrator Preview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="rounded-b-xl overflow-hidden text-sm">
                <SyntaxHighlighter language="javascript" style={atomDark} customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}>
                  {MOCK_CODE}
                </SyntaxHighlighter>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="border-zinc-800 bg-indigo-600/5">
            <CardHeader>
              <CardTitle className="text-sm">Health Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Global Latency</span>
                <span className="text-sm font-bold text-emerald-400">14ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Error Rate</span>
                <span className="text-sm font-bold">0.02%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">CPU Usage</span>
                <span className="text-sm font-bold">12ms avg</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900/40">
            <CardHeader>
              <CardTitle className="text-sm">Infrastructure Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { event: 'Auto-Scaling', desc: 'Triggered in US-East', time: '5m' },
                { event: 'Redeploy', desc: 'Commander script updated', time: '14m' },
                { event: 'Durable Object', desc: 'Migration complete', time: '1h' },
              ].map((e, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-xs font-bold">{e.event}</p>
                    <p className="text-[10px] text-muted-foreground">{e.desc}</p>
                  </div>
                  <span className="text-[10px] text-zinc-600">{e.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
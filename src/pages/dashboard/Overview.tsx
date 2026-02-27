import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';
import { 
  Users, 
  Activity, 
  Zap, 
  Clock, 
  PlusCircle, 
  ArrowUpRight,
  Bot
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SYSTEM_METRICS, RECENT_ACTIVITY } from '@/lib/mock-data';
import { Badge } from "@/components/ui/badge";
export function Overview() {
  return (
    <div className="p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground">Monitor and manage your agentic infrastructure.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Last 24 Hours
          </Button>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            Deploy Agent
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Agents", value: "12", icon: Users, trend: "+2", color: "text-blue-500" },
          { label: "Req / Minute", value: "1.2k", icon: Activity, trend: "+12%", color: "text-emerald-500" },
          { label: "Avg Latency", value: "12ms", icon: Zap, trend: "-4ms", color: "text-amber-500" },
          { label: "Health Score", value: "99.9%", icon: Shield, trend: "Stable", color: "text-indigo-500" }
        ].map((stat, i) => (
          <Card key={i} className="hover:border-indigo-500/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-500">{stat.trend}</span> from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Request volume across global edge points.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SYSTEM_METRICS}>
                <XAxis dataKey="time" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#6366f1" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>System events and logs.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${activity.type === 'error' ? 'bg-red-500' : activity.type === 'success' ? 'bg-emerald-500' : 'bg-zinc-400'}`} />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs text-muted-foreground">
              View All Logs
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
function Shield(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .52-.88l7-4a1 1 0 0 1 .96 0l7 4A1 1 0 0 1 20 6v7z" />
    </svg>
  );
}
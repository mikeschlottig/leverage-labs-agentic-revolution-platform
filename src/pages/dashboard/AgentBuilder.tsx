import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Plus, Search, MoreVertical, Edit2 } from 'lucide-react';
import { AGENT_LIST } from '@/lib/mock-data';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
export function AgentBuilder() {
  return (
    <div className="h-full flex flex-col overflow-hidden animate-in fade-in duration-500">
      <div className="border-b bg-muted/30 p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5 text-indigo-500" />
          Agentic Systems
        </h2>
        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          New Agent
        </Button>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar List */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search agents..."
                className="pl-8 h-9"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {AGENT_LIST.map((agent) => (
              <button
                key={agent.id}
                className="w-full p-4 flex flex-col gap-1 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-b last:border-0 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{agent.name}</span>
                  <Badge variant={agent.status === 'Online' ? 'default' : 'secondary'} className="text-[10px] py-0 px-1.5 h-4">
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{agent.description}</p>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                  {agent.model}
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Canvas / Detail Placeholder */}
        <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/50 p-8 flex flex-col items-center justify-center text-center">
          <div className="max-w-md space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto">
              <Edit2 className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold">Select an agent to configure</h3>
            <p className="text-muted-foreground">
              Define behaviors, system prompts, and tool access in the agent designer canvas.
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">Template Gallery</Button>
              <Button className="bg-indigo-600">Start from Scratch</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
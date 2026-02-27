import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Library, Cpu, Search, MoreVertical, Copy, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAgentStore } from '@/lib/store';
import { toast } from 'sonner';
export function KnowledgeBase() {
  const personas = useAgentStore(s => s.personas);
  const prompts = useAgentStore(s => s.prompts);
  const deletePersona = useAgentStore(s => s.deletePersona);
  const deletePrompt = useAgentStore(s => s.deletePrompt);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Knowledge & Templates</h1>
          <p className="text-muted-foreground">Manage shared personas and reusable prompt snippets.</p>
        </div>
        <Button className="bg-indigo-600 gap-2">
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>
      <Tabs defaultValue="personas" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="personas" className="gap-2">
            <Cpu className="h-4 w-4" />
            Personas
          </TabsTrigger>
          <TabsTrigger value="prompts" className="gap-2">
            <Library className="h-4 w-4" />
            Prompt Library
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personas" className="space-y-6">
          <div className="relative max-w-sm mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8" placeholder="Search personas..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personas.map((p) => (
              <Card key={p.id} className="glass-dark border-zinc-800 hover:border-zinc-700 transition-all group">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    <Badge variant="outline" className="text-[10px]">{p.model}</Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{p.description}</p>
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5" onClick={() => toast('Cloning persona...')}>
                      <Copy className="h-3 w-3" /> Clone
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-destructive hover:text-destructive" onClick={() => deletePersona(p.id)}>
                      <Trash2 className="h-3 w-3" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="prompts" className="space-y-6">
          <div className="space-y-4">
            {prompts.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border bg-muted/10 group hover:bg-muted/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Library className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.category} • {item.content.substring(0, 60)}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                    navigator.clipboard.writeText(item.content);
                    toast.success('Prompt copied');
                  }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deletePrompt(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
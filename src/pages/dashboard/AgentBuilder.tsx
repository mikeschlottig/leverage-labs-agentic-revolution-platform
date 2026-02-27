import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Plus, Search, Save, Play, ChevronLeft, Boxes, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PromptEditor } from '@/components/agent/PromptEditor';
import { useAgentStore, AgentConfig } from '@/lib/store';
import { MODELS } from '@/lib/chat';
import { toast } from 'sonner';
export function AgentBuilder() {
  const isEditing = useAgentStore(s => s.isEditing);
  const draftAgent = useAgentStore(s => s.draftAgent);
  const personas = useAgentStore(s => s.personas);
  const setIsEditing = useAgentStore(s => s.setIsEditing);
  const setDraftAgent = useAgentStore(s => s.setDraftAgent);
  const updateDraft = useAgentStore(s => s.updateDraft);
  const savePersona = useAgentStore(s => s.savePersona);
  const startNew = () => {
    const id = crypto.randomUUID();
    setDraftAgent({
      id,
      name: 'New Agent',
      model: MODELS[0].id,
      systemPrompt: '',
      status: 'Idle',
      description: 'A custom orchestrated agent.',
      enabledTools: ['web_search']
    });
    setIsEditing(true);
  };
  const openEditor = (agent: AgentConfig) => {
    setDraftAgent(agent);
    setIsEditing(true);
  };
  const handleSave = () => {
    if (draftAgent) {
      savePersona(draftAgent);
      toast.success(`${draftAgent.name} saved successfully`);
    }
  };
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-zinc-950/20">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold">Agentic Systems</h1>
                <p className="text-muted-foreground">Manage and orchestrate your autonomous worker fleet.</p>
              </div>
              <Button onClick={startNew} className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                New Agent
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personas.map((agent) => (
                <Card 
                  key={agent.id} 
                  className="group hover:border-indigo-500/50 transition-all cursor-pointer bg-zinc-900/40 backdrop-blur-sm"
                  onClick={() => openEditor(agent)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-indigo-400" />
                      </div>
                      <Badge variant={agent.status === 'Online' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-400 transition-colors">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{agent.description}</p>
                    <div className="flex items-center gap-2 pt-4 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{agent.model.split('/')[1]}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="studio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col h-full"
          >
            <div className="border-b px-6 h-14 flex items-center justify-between bg-background">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="font-bold">{draftAgent?.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Play className="h-3.5 w-3.5" />
                  Test
                </Button>
                <Button onClick={handleSave} size="sm" className="bg-indigo-600 gap-2">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </Button>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={25} minSize={20}>
                  <div className="p-6 space-y-6 h-full border-r overflow-y-auto">
                    <div className="space-y-4">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Configuration</h4>
                      <div className="space-y-2">
                        <Label>Agent Name</Label>
                        <Input 
                          value={draftAgent?.name || ''} 
                          onChange={(e) => updateDraft({ name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Base Model</Label>
                        <Select 
                          value={draftAgent?.model} 
                          onValueChange={(v) => updateDraft({ model: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MODELS.map(m => (
                              <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Parameters</h4>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Persistent State</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Human in the loop</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} minSize={30}>
                  <div className="p-6 h-full bg-zinc-950/20">
                    <PromptEditor 
                      value={draftAgent?.systemPrompt || ''} 
                      onChange={(v) => updateDraft({ systemPrompt: v })}
                      onOptimize={() => toast.info('AI Optimization is analyzing your prompt...')}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25} minSize={20}>
                  <div className="p-6 space-y-6 h-full border-l overflow-y-auto">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Tool Bindings</h4>
                    <div className="space-y-4">
                      {[
                        { id: 'web_search', name: 'Web Search', icon: Zap, desc: 'Search and scrape the web.' },
                        { id: 'd1_query', name: 'D1 Storage', icon: Boxes, desc: 'Read/Write to Cloudflare SQL.' },
                        { id: 'r2_lake', name: 'R2 Data Lake', icon: Shield, desc: 'Manage large blob storage.' }
                      ].map((tool) => (
                        <div key={tool.id} className="flex items-start gap-3 p-3 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors">
                          <tool.icon className="h-5 w-5 mt-1 text-indigo-400" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold">{tool.name}</span>
                              <Switch 
                                checked={draftAgent?.enabledTools.includes(tool.id)}
                                onCheckedChange={(checked) => {
                                  const current = draftAgent?.enabledTools || [];
                                  const updated = checked 
                                    ? [...current, tool.id] 
                                    : current.filter(id => id !== tool.id);
                                  updateDraft({ enabledTools: updated });
                                }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">{tool.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
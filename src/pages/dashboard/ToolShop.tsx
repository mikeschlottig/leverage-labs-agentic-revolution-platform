import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, Database, Terminal, Search, ExternalLink, Settings, Play, Server, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
export function ToolShop() {
  const mcpTools = [
    { name: 'google_search', source: 'Web-Search', desc: 'Perform live Google searches via SerpAPI.', params: ['query', 'num_results'] },
    { name: 'd1_query', source: 'Cloudflare-D1', desc: 'Execute SQL queries against configured D1 database.', params: ['sql'] },
    { name: 'r2_read', source: 'Cloudflare-R2', desc: 'Fetch content from an R2 bucket.', params: ['bucket', 'key'] },
    { name: 'worker_log', source: 'Cloudflare-Workers', desc: 'Retrieve recent deployment logs.', params: ['worker_name'] }
  ];
  const handleTest = (name: string) => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 1500)), {
      loading: `Executing test call for ${name}...`,
      success: 'Execution successful. Result: { status: "ok" }',
      error: 'Execution failed.'
    });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">MCP Tool Shop</h1>
          <p className="text-muted-foreground">Manage agent capabilities across Cloudflare services.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 h-10 w-[240px]" placeholder="Search tools..." />
          </div>
          <Button size="icon" variant="outline" className="h-10 w-10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mcpTools.map((tool) => (
          <Card key={tool.name} className="hover:border-indigo-500/50 transition-all bg-zinc-900/40 backdrop-blur-sm overflow-hidden border-zinc-800">
            <div className="absolute top-0 right-0 p-4">
              <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                {tool.source}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                  {tool.source.includes('D1') ? <Database className="h-5 w-5 text-indigo-400" /> :
                   tool.source.includes('Workers') ? <Terminal className="h-5 w-5 text-indigo-400" /> :
                   <Network className="h-5 w-5 text-indigo-400" />}
                </div>
                <CardTitle className="text-xl font-mono">{tool.name}</CardTitle>
              </div>
              <CardDescription>{tool.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] uppercase font-bold text-zinc-500 mb-2">Required Parameters</h5>
                  <div className="flex flex-wrap gap-2">
                    {tool.params.map(p => (
                      <code key={p} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">{p}</code>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-zinc-800 flex gap-2">
                  <Button size="sm" className="bg-indigo-600 h-8 gap-1.5" onClick={() => handleTest(tool.name)}>
                    <Play className="h-3 w-3" /> Test Execution
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 gap-1.5">
                    <ExternalLink className="h-3 w-3" /> Docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-indigo-400" />
          <h2 className="text-xl font-bold">Custom MCP Servers</h2>
        </div>
        <Card className="border-zinc-800 bg-zinc-900/40">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800">
                <TableHead>Server Name</TableHead>
                <TableHead>Protocol</TableHead>
                <TableHead>Endpoint URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-zinc-800">
                <TableCell className="font-medium">Company-Internal-Wiki</TableCell>
                <TableCell><Badge variant="outline">SSE</Badge></TableCell>
                <TableCell className="font-mono text-xs">https://mcp.internal.acme.com/sse</TableCell>
                <TableCell><div className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-emerald-500" /> Active</div></TableCell>
                <TableCell className="text-right"><Button variant="ghost" size="sm">Edit</Button></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="p-4 border-t border-zinc-800 flex justify-center">
            <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white">
              <Plus className="h-4 w-4 mr-2" /> Add custom server
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
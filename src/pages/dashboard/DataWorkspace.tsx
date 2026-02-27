import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, HardDrive, Share2, Search, Filter, Download, ArrowRight, Table as TableIcon, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { D1_DATABASES, R2_BUCKETS, DATA_PIPELINES } from '@/lib/mock-data';
export function DataWorkspace() {
  const [selectedDb, setSelectedDb] = useState(D1_DATABASES[0]);
  const [selectedBucket, setSelectedBucket] = useState(R2_BUCKETS[0]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Data Workspace</h1>
        <p className="text-muted-foreground">Manage your SQL databases, object storage, and data orchestration.</p>
      </div>
      <Tabs defaultValue="pipelines" className="w-full">
        <TabsList className="grid w-full max-w-[450px] grid-cols-3 mb-8">
          <TabsTrigger value="pipelines" className="gap-2">
            <Share2 className="h-4 w-4" /> Pipelines
          </TabsTrigger>
          <TabsTrigger value="d1" className="gap-2">
            <Database className="h-4 w-4" /> D1 Explorer
          </TabsTrigger>
          <TabsTrigger value="r2" className="gap-2">
            <HardDrive className="h-4 w-4" /> R2 Data Lake
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pipelines" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {DATA_PIPELINES.map((p) => (
              <Card key={p.id} className="glass-dark border-zinc-800 overflow-hidden group">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <FileText className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{p.name}</h4>
                        <p className="text-sm text-muted-foreground">{p.source}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600">
                      <div className="h-px w-12 bg-zinc-800" />
                      <div className="h-8 w-8 rounded-full border border-zinc-800 flex items-center justify-center animate-pulse">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      <div className="h-px w-12 bg-zinc-800" />
                    </div>
                    <div className="flex-1 flex items-center gap-4 justify-end text-right">
                      <div>
                        <h4 className="font-bold text-lg">{p.destination}</h4>
                        <p className="text-sm text-muted-foreground">{p.frequency}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <Database className="h-6 w-6 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="d1" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Databases</h3>
              <div className="space-y-1">
                {D1_DATABASES.map(db => (
                  <Button
                    key={db.id}
                    variant={selectedDb.id === db.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start gap-2"
                    onClick={() => setSelectedDb(db)}
                  >
                    <Database className="h-4 w-4" /> {db.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <TableIcon className="h-5 w-5 text-indigo-400" />
                  <h2 className="text-xl font-bold">{selectedDb.tables[0]} <span className="text-sm font-normal text-muted-foreground">({selectedDb.rowCount} rows)</span></h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Query Console</Button>
                  <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-2" /> Export</Button>
                </div>
              </div>
              <Card className="border-zinc-800 bg-zinc-900/40">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead>ID</TableHead>
                      <TableHead>Payload</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map(i => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell className="font-mono text-xs text-zinc-400">row_{Math.random().toString(36).substr(2, 6)}</TableCell>
                        <TableCell className="max-w-xs truncate font-mono text-xs">{"{ agent_id: 'commander_01', type: 'health_check' }"}</TableCell>
                        <TableCell className="text-xs text-zinc-500">2024-03-20 14:2{i}:00</TableCell>
                        <TableCell><Badge variant="outline" className="text-[10px]">Indexed</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="r2" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {R2_BUCKETS.map(bucket => (
              <Card key={bucket.name} className="glass-dark border-zinc-800 hover:border-indigo-500/30 transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <HardDrive className="h-5 w-5 text-cyan-400" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] uppercase font-bold">{bucket.region}</Badge>
                  </div>
                  <CardTitle>{bucket.name}</CardTitle>
                  <CardDescription>Created {bucket.createdAt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm py-4 border-t border-zinc-800">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-mono">{bucket.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-4 border-t border-zinc-800">
                    <span className="text-muted-foreground">Objects</span>
                    <span className="font-mono">{bucket.objectCount}</span>
                  </div>
                  <Button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700">Browse Contents</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
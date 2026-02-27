import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Library, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  onOptimize?: () => void;
}
export function PromptEditor({ value, onChange, onOptimize }: PromptEditorProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success('Prompt copied to clipboard');
  };
  return (
    <div className="flex flex-col h-full border rounded-xl overflow-hidden bg-zinc-950/50">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">System Prompt</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
            {value.length} chars
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onOptimize}>
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onChange('')}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="relative flex-1 group">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter the instructions for your agent..."
          className="h-full w-full min-h-[300px] border-0 focus-visible:ring-0 bg-transparent font-mono text-sm resize-none p-6 leading-relaxed"
        />
      </div>
      <div className="p-3 border-t bg-muted/10 flex items-center justify-between">
        <p className="text-[10px] text-zinc-500 italic">
          Tip: Use <code className="text-indigo-400">{"{{variable}}"}</code> to inject dynamic context.
        </p>
        <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1.5">
          <Library className="h-3 w-3" />
          Use Template
        </Button>
      </div>
    </div>
  );
}
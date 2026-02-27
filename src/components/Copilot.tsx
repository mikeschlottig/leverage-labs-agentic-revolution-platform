import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Paperclip, 
  MessageSquare,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { chatService } from '@/lib/chat';
import { Badge } from '@/components/ui/badge';
import type { Message } from '../../worker/types';
export function Copilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      loadMessages();
    }
  }, [isOpen]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);
  const loadMessages = async () => {
    const res = await chatService.getMessages();
    if (res.success && res.data) {
      setMessages(res.data.messages);
    }
  };
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input;
    setInput('');
    setIsLoading(true);
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userText,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    try {
      const res = await chatService.sendMessage(userText);
      if (res.success) {
        await loadMessages();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const clearChat = async () => {
    await chatService.clearMessages();
    setMessages([]);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 rounded-full border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="hidden sm:inline">Copilot</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-500" />
              <SheetTitle className="text-base font-display">System Copilot</SheetTitle>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat">
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto">
                  <Bot className="w-6 h-6 text-zinc-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  I'm your SDK assistant. Ask me anything about agents, workers, or D1 databases.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-800'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-zinc-400" />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-background">
          <div className="relative bg-zinc-100 dark:bg-zinc-900 rounded-xl border p-2 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Type your instruction..."
              className="min-h-[40px] max-h-[200px] border-0 bg-transparent focus-visible:ring-0 shadow-none resize-none px-2"
            />
            <div className="flex items-center justify-between mt-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="sm" 
                className="h-8 bg-indigo-600 hover:bg-indigo-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 text-center mt-3">
            Powered by Agents SDK • Request limits apply
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
interface GlowingButtonProps extends ButtonProps {
  glowColor?: string;
}
export function GlowingButton({ 
  className, 
  glowColor = "indigo", 
  children, 
  ...props 
}: GlowingButtonProps) {
  const colorMap: Record<string, string> = {
    indigo: "hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.6)] border-indigo-500/50",
    cyan: "hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.6)] border-cyan-500/50",
    primary: "hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.6)]"
  };
  return (
    <Button
      className={cn(
        "relative rounded-xl border bg-zinc-900 text-white font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        colorMap[glowColor],
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
    </Button>
  );
}
import React from 'react';
import CopilotChat from '@/components/copilot/CopilotChat';

export default function Home() {
  return (
    <div className="flex w-full h-[calc(100vh-3.5rem)] overflow-hidden">
      <CopilotChat />
    </div>
  );
}

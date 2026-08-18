import React from 'react';
import CopilotChat from '@/components/copilot/CopilotChat';
import ContactGrid from '@/components/directory/ContactGrid';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-[calc(100vh-3.5rem)] overflow-y-auto lg:overflow-hidden">
      <CopilotChat />
      <ContactGrid />
    </div>
  );
}

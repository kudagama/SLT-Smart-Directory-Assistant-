import React from 'react';
import CopilotChat from '@/components/copilot/CopilotChat';
import ContactGrid from '@/components/directory/ContactGrid';

export default function Home() {
  return (
    <div className="flex w-full h-full overflow-hidden">
      <CopilotChat />
      <ContactGrid />
    </div>
  );
}

import React from 'react';
import CopilotChat from '@/components/copilot/CopilotChat';
import ContactGrid from '@/components/directory/ContactGrid';
import EmotionDetector from '@/components/camera/EmotionDetector';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-3.5rem)] relative">
      <EmotionDetector />
      <ContactGrid />
      <CopilotChat />
    </div>
  );
}

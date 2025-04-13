import React from 'react';
import { Calendar } from 'lucide-react';

interface Event {
  title: string;
  description: string;
  colorClass: string;
}

interface UpcomingEventsProps {
  events?: Event[];
}

const defaultEvents: Event[] = [
  { 
    title: 'Weekly CTF Competition', 
    description: 'Starts in 2 days • 1000 points', 
    colorClass: 'border-purple-500' 
  },
  { 
    title: 'New Advanced Course', 
    description: 'Released tomorrow • Web Security', 
    colorClass: 'border-cyan-500' 
  },
];

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events = defaultEvents }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 font-mono flex items-center">
        <Calendar className="mr-2 text-cyan-400" /> Upcoming Events
      </h2>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className={`bg-gray-700 rounded-lg p-3 border-l-2 ${event.colorClass}`}>
            <h3 className="font-mono font-bold text-sm">{event.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents; 
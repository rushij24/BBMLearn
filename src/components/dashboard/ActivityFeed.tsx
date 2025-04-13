import React from 'react';
import { Activity, Trophy, Flag, PlayCircle } from 'lucide-react';

interface ActivityItem {
  type: 'completed' | 'joined' | 'started' | string;
  text: string;
  time: string;
  icon: any;
  iconClass: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
}

const defaultActivities: ActivityItem[] = [
  { type: 'completed', text: 'Completed SQL Injection Lab', time: '2 hours ago', icon: Trophy, iconClass: 'text-green-400' },
  { type: 'joined', text: 'Joined CTF Challenge #4', time: '1 day ago', icon: Flag, iconClass: 'text-red-400' },
  { type: 'started', text: 'Started Authentication Module', time: '3 days ago', icon: PlayCircle, iconClass: 'text-blue-400' },
];

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities = defaultActivities }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 font-mono flex items-center">
        <Activity className="mr-2 text-cyan-400" /> Recent Activity
      </h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${activity.iconClass.replace('text', 'bg')}/10`}>
              <activity.icon className={activity.iconClass} size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed; 
import React from 'react';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import StatsOverview from '../components/dashboard/StatsOverview';
import LearningPath from '../components/dashboard/LearningPath';
import RecentChallenges from '../components/dashboard/RecentChallenges';
import Leaderboard from '../components/dashboard/Leaderboard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import { challenges } from '../data/mockData';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <WelcomeHeader />
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="col-span-8 space-y-6">
          {/* Stats Overview */}
          <StatsOverview />
          
          {/* Learning Path */}
          <LearningPath />
          
          {/* Recent Challenges */}
          <RecentChallenges challenges={challenges} />
        </div>
        
        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          {/* Leaderboard */}
          <Leaderboard />
          
          {/* Activity Feed */}
          <ActivityFeed />
          
          {/* Upcoming Events */}
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 
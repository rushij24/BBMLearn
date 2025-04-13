import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Terminal, Flag, Star, Clock, Calendar, Award, User, Mail, MapPin, 
  ArrowUpRight, Bookmark, Shield, Activity, BookOpen, Code, GitBranch, CheckCircle
} from 'lucide-react';
import SkillMatrix from '../components/SkillMatrix';
import { cn } from '../lib/utils';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from an API or context
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, USA',
    joinDate: 'January 2024',
    role: 'Security Analyst',
    rank: '#42',
    points: 3750,
    completedLabs: 12,
    ctfFlags: 8,
    ongoingLabs: 3,
    achievements: [
      { name: 'First Blood', description: 'Completed first challenge', icon: Star },
      { name: 'Lab Master', description: 'Completed 10 labs', icon: Terminal },
      { name: 'Flag Hunter', description: 'Captured 5 flags', icon: Flag },
      { name: 'Quick Learner', description: 'Completed 3 labs in a single day', icon: Clock },
    ],
    recentActivity: [
      { type: 'lab', name: 'Secure Authentication System', date: '2 days ago', status: 'completed' },
      { type: 'ctf', name: 'SQL Injection Challenge', date: '5 days ago', status: 'in-progress' },
      { type: 'lab', name: 'WAF Implementation', date: '1 week ago', status: 'completed' },
      { type: 'lab', name: 'Docker Security', date: '2 weeks ago', status: 'completed' },
    ],
    skills: [
      { name: 'Web Security', level: 85 },
      { name: 'Network Security', level: 75 },
      { name: 'Cryptography', level: 60 },
      { name: 'Malware Analysis', level: 45 },
    ],
  };

  // Convert skills to the format needed by SkillMatrix
  const skillsData = [
    {
      category: 'Web Security',
      skills: [
        { name: 'Authentication', level: 85 },
        { name: 'XSS Prevention', level: 75 },
        { name: 'SQL Injection', level: 90 },
        { name: 'CSRF', level: 70 },
      ],
    },
    {
      category: 'Network Security',
      skills: [
        { name: 'Firewall Configuration', level: 80 },
        { name: 'IDS/IPS', level: 65 },
        { name: 'VPN Setup', level: 75 },
        { name: 'Network Monitoring', level: 85 },
      ],
    },
    {
      category: 'Application Security',
      skills: [
        { name: 'Code Review', level: 70 },
        { name: 'Secure Design', level: 80 },
        { name: 'API Security', level: 85 },
        { name: 'Input Validation', level: 90 },
      ],
    },
    {
      category: 'Cryptography',
      skills: [
        { name: 'Encryption', level: 75 },
        { name: 'Key Management', level: 65 },
        { name: 'Hashing', level: 85 },
        { name: 'Digital Signatures', level: 70 },
      ],
    },
    {
      category: 'Infrastructure',
      skills: [
        { name: 'Cloud Security', level: 80 },
        { name: 'Container Security', level: 75 },
        { name: 'Server Hardening', level: 85 },
        { name: 'Access Control', level: 90 },
      ],
    },
  ];

  return (
    <div className={cn("space-y-6")}>
      {/* Profile Header */}
      <div className={cn("bg-gray-800 rounded-lg overflow-hidden")}>
        {/* Cover Image */}
        <div className={cn("h-32 bg-gradient-to-r from-indigo-600 to-cyan-600")}></div>
        
        {/* Profile Info */}
        <div className={cn("p-6 relative")}>
          {/* Avatar */}
          <div className={cn("absolute -top-12 left-6 w-24 h-24 bg-gray-700 rounded-full ring-4 ring-gray-800 flex items-center justify-center")}>
            <User size={42} className={cn("text-gray-300")} />
          </div>
          
          {/* User Details */}
          <div className={cn("ml-32 flex justify-between items-start")}>
            <div>
              <div className={cn("flex items-center gap-2")}>
                <h1 className={cn("text-2xl font-bold")}>{user.name}</h1>
                <span className={cn("bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-xs font-medium")}>
                  {user.role}
                </span>
              </div>
              <div className={cn("flex items-center space-x-4 mt-2 text-gray-400 text-sm")}>
                <div className={cn("flex items-center")}>
                  <Mail size={14} className={cn("mr-1")} />
                  {user.email}
                </div>
                <div className={cn("flex items-center")}>
                  <MapPin size={14} className={cn("mr-1")} />
                  {user.location}
                </div>
                <div className={cn("flex items-center")}>
                  <Calendar size={14} className={cn("mr-1")} />
                  Joined {user.joinDate}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className={cn("bg-gray-700 text-white px-3 py-1.5 rounded hover:bg-gray-600 transition-colors text-sm font-medium")}>
                Settings
              </button>
              <button className={cn("bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 transition-colors text-sm font-medium")}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={cn("grid grid-cols-4 gap-4")}>
        {[
          { label: 'Rank', value: user.rank, icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
          { label: 'Total Points', value: user.points, icon: Star, color: 'text-emerald-400', bgColor: 'bg-emerald-400/10' },
          { label: 'Labs Completed', value: user.completedLabs, icon: CheckCircle, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
          { label: 'CTF Flags', value: user.ctfFlags, icon: Flag, color: 'text-red-400', bgColor: 'bg-red-400/10' },
        ].map((stat, i) => (
          <div key={i} className={cn("bg-gray-800 rounded-lg p-4 border border-gray-700")}>
            <div className={cn("flex items-center justify-between mb-2")}>
              <p className={cn("text-gray-400 font-medium text-sm")}>{stat.label}</p>
              <div className={cn(`${stat.bgColor} p-1.5 rounded`)}>
                <stat.icon className={stat.color} size={16} />
              </div>
            </div>
            <p className={cn("text-2xl font-bold")}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className={cn("grid grid-cols-12 gap-6")}>
        {/* Left Column - Split into two rows */}
        <div className={cn("col-span-8 space-y-6")}>
          {/* First Row - Skill Matrix in a smaller container */}
          <div className={cn("grid grid-cols-12 gap-6")}>
            {/* Skill Matrix Card */}
            <div className={cn("col-span-6 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden")}>
              <div className={cn("border-b border-gray-700 p-3 flex justify-between items-center")}>
                <h2 className={cn("font-semibold flex items-center")}>
                  <Activity className={cn("mr-1.5 text-indigo-400")} size={16} /> Skill Matrix
                </h2>
                <button className={cn("text-xs text-gray-400 flex items-center hover:text-white transition-colors")}>
                  Details <ArrowUpRight size={12} className={cn("ml-0.5")} />
                </button>
              </div>
              <div className={cn("p-2")}>
                <SkillMatrix skills={skillsData} />
              </div>
            </div>

            {/* Top Skills Card */}
            <div className={cn("col-span-6 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden")}>
              <div className={cn("border-b border-gray-700 p-3 flex justify-between items-center")}>
                <h2 className={cn("font-semibold flex items-center")}>
                  <Star className={cn("mr-1.5 text-indigo-400")} size={16} /> Top Skills
                </h2>
                <button className={cn("text-xs text-gray-400 flex items-center hover:text-white transition-colors")}>
                  All Skills <ArrowUpRight size={12} className={cn("ml-0.5")} />
                </button>
              </div>
              <div className={cn("p-4 space-y-3")}>
                {user.skills.map((skill, index) => (
                  <div key={index} className={cn("flex items-center justify-between")}>
                    <span className={cn("text-sm")}>{skill.name}</span>
                    <div className={cn("flex items-center gap-2")}>
                      <div className={cn("w-40 h-2 bg-gray-700 rounded-full overflow-hidden")}>
                        <div 
                          className={cn("h-full bg-indigo-500 rounded-full")} 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <span className={cn("text-xs font-medium text-indigo-300 w-8 text-right")}>{skill.level}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Recent Activity */}
          <div className={cn("bg-gray-800 rounded-lg border border-gray-700 overflow-hidden")}>
            <div className={cn("border-b border-gray-700 p-4 flex justify-between items-center")}>
              <h2 className={cn("font-semibold flex items-center text-lg")}>
                <Clock className={cn("mr-2 text-indigo-400")} size={18} /> Recent Activity
              </h2>
              <button className={cn("text-xs text-gray-400 flex items-center hover:text-white transition-colors")}>
                View All <ArrowUpRight size={14} className={cn("ml-1")} />
              </button>
            </div>
            <div className={cn("divide-y divide-gray-700")}>
              {user.recentActivity.map((activity, index) => (
                <div key={index} className={cn("p-4 hover:bg-gray-750 transition-colors")}>
                  <div className={cn("flex items-center justify-between")}>
                    <div className={cn("flex items-center")}>
                      <div className={cn(`p-2 rounded ${activity.type === 'lab' ? 'bg-indigo-400/10' : 'bg-red-400/10'} mr-3`)}>
                        {activity.type === 'lab' ? (
                          <Terminal className={cn("text-indigo-400")} size={16} />
                        ) : (
                          <Flag className={cn("text-red-400")} size={16} />
                        )}
                      </div>
                      <div>
                        <h3 className={cn("font-medium text-sm")}>{activity.name}</h3>
                        <p className={cn("text-gray-400 text-xs")}>{activity.date}</p>
                      </div>
                    </div>
                    <span className={cn(`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`)}>
                      {activity.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Achievements */}
        <div className={cn("col-span-4")}>
          <div className={cn("bg-gray-800 rounded-lg border border-gray-700 overflow-hidden")}>
            <div className={cn("border-b border-gray-700 p-4 flex justify-between items-center")}>
              <h2 className={cn("font-semibold flex items-center text-lg")}>
                <Award className={cn("mr-2 text-indigo-400")} size={18} /> Achievements
              </h2>
              <button className={cn("text-xs text-gray-400 flex items-center hover:text-white transition-colors")}>
                View All <ArrowUpRight size={14} className={cn("ml-1")} />
              </button>
            </div>
            <div className={cn("p-4 space-y-3")}>
              {user.achievements.map((achievement, index) => (
                <div key={index} className={cn("flex p-3 rounded-lg bg-gray-750 border border-gray-700")}>
                  <div className={cn("p-2 rounded bg-yellow-400/10 mr-3")}>
                    <achievement.icon className={cn("text-yellow-400")} size={16} />
                  </div>
                  <div>
                    <h3 className={cn("font-medium text-sm")}>{achievement.name}</h3>
                    <p className={cn("text-gray-400 text-xs")}>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 
export const timelineSections = [
  {
    id: 'fundamentals',
    title: 'Security Fundamentals',
    description: 'Master the core concepts and principles of cybersecurity',
    requiredPoints: 0,
    modules: [
      {
        id: 'sec-101',
        title: 'Introduction to Cybersecurity',
        description: 'Learn the basic concepts and importance of cybersecurity',
        type: 'theory',
        duration: '2 hours',
        completed: true,
        locked: false,
        points: 100,
        skills: ['Security Basics', 'Risk Management', 'Security Policies'],
        dependencies: [],
        labs: [
          {
            id: 'lab-101',
            title: 'Security Tools Setup',
            description: 'Set up and configure essential security tools',
            duration: '45 min',
            difficulty: 'beginner',
            type: 'guided',
            completed: true,
            locked: false
          }
        ]
      },
      {
        id: 'sec-102',
        title: 'Network Security Basics',
        description: 'Understanding network security fundamentals and protocols',
        type: 'practical',
        duration: '4 hours',
        completed: false,
        locked: false,
        points: 150,
        skills: ['Networking', 'Protocols', 'Firewalls'],
        dependencies: ['sec-101'],
        labs: [
          {
            id: 'lab-102a',
            title: 'Packet Analysis',
            description: 'Analyze network traffic using Wireshark',
            duration: '1 hour',
            difficulty: 'beginner',
            type: 'hands-on',
            completed: false,
            locked: false
          },
          {
            id: 'lab-102b',
            title: 'Firewall Configuration',
            description: 'Configure and test firewall rules',
            duration: '1.5 hours',
            difficulty: 'intermediate',
            type: 'hands-on',
            completed: false,
            locked: false
          }
        ]
      }
    ]
  },
  {
    id: 'web-security',
    title: 'Web Application Security',
    description: 'Learn to identify and protect against web application vulnerabilities',
    requiredPoints: 250,
    modules: [
      {
        id: 'sec-201',
        title: 'OWASP Top 10',
        description: 'Understanding common web application vulnerabilities',
        type: 'theory',
        duration: '6 hours',
        completed: false,
        locked: true,
        points: 200,
        skills: ['Web Security', 'OWASP', 'Vulnerability Assessment'],
        dependencies: ['sec-102'],
        labs: [
          {
            id: 'lab-201a',
            title: 'SQL Injection',
            description: 'Practice identifying and exploiting SQL injection vulnerabilities',
            duration: '2 hours',
            difficulty: 'intermediate',
            type: 'challenge',
            completed: false,
            locked: true
          },
          {
            id: 'lab-201b',
            title: 'XSS Prevention',
            description: 'Implement protections against cross-site scripting',
            duration: '1.5 hours',
            difficulty: 'intermediate',
            type: 'hands-on',
            completed: false,
            locked: true
          }
        ]
      },
      {
        id: 'sec-202',
        title: 'Secure Authentication',
        description: 'Implementing secure authentication and session management',
        type: 'practical',
        duration: '5 hours',
        completed: false,
        locked: true,
        points: 250,
        skills: ['Authentication', 'Session Management', 'OAuth', 'JWT'],
        dependencies: ['sec-201'],
        labs: [
          {
            id: 'lab-202',
            title: 'OAuth Implementation',
            description: 'Implement OAuth 2.0 authentication flow',
            duration: '3 hours',
            difficulty: 'advanced',
            type: 'challenge',
            completed: false,
            locked: true
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-security',
    title: 'Advanced Security Concepts',
    description: 'Master advanced security techniques and tools',
    requiredPoints: 700,
    modules: [
      {
        id: 'sec-301',
        title: 'Penetration Testing',
        description: 'Learn professional penetration testing methodologies',
        type: 'practical',
        duration: '8 hours',
        completed: false,
        locked: true,
        points: 300,
        skills: ['Penetration Testing', 'Vulnerability Assessment', 'Reporting'],
        dependencies: ['sec-202'],
        labs: [
          {
            id: 'lab-301a',
            title: 'Network Penetration',
            description: 'Conduct a full network penetration test',
            duration: '4 hours',
            difficulty: 'advanced',
            type: 'challenge',
            completed: false,
            locked: true
          },
          {
            id: 'lab-301b',
            title: 'Web App Penetration',
            description: 'Perform a web application penetration test',
            duration: '4 hours',
            difficulty: 'advanced',
            type: 'challenge',
            completed: false,
            locked: true
          }
        ]
      },
      {
        id: 'sec-302',
        title: 'Security Assessment',
        description: 'Final assessment of all security concepts',
        type: 'assessment',
        duration: '4 hours',
        completed: false,
        locked: true,
        points: 400,
        skills: ['Security Assessment', 'Documentation', 'Risk Analysis'],
        dependencies: ['sec-301'],
        labs: [
          {
            id: 'lab-302',
            title: 'Final Security Challenge',
            description: 'Complete a comprehensive security assessment challenge',
            duration: '4 hours',
            difficulty: 'advanced',
            type: 'challenge',
            completed: false,
            locked: true
          }
        ]
      }
    ]
  }
]; 
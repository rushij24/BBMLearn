import { Lock, Database, Network, FileCode2, Bug, Target, FileWarning, Server, ShieldCheck, Workflow, Cpu, Shield } from 'lucide-react';
import { Challenge } from '../components/dashboard/RecentChallenges';

// Lab environment templates
export const labTemplates = {
  build: {
    authentication: {
      description: `# Secure Authentication System Lab

This lab will guide you through building a secure authentication system following industry best practices.

## Objectives
1. Implement secure password hashing using bcrypt
2. Set up JWT-based session management
3. Add rate limiting for login attempts
4. Implement 2FA (optional)

## Initial Setup
\`\`\`javascript
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// TODO: Add your code here
\`\`\``,
      tests: [
        "Test 1: Password should be properly hashed",
        "Test 2: JWT should be signed with secure algorithm",
        "Test 3: Rate limiting should prevent brute force",
      ],
      hints: [
        "Use bcrypt.hash() with a salt round of at least 10",
        "Consider using express-rate-limit for request throttling",
        "Store JWTs securely, preferably in HttpOnly cookies",
      ]
    },
    database: {
      description: `# Secure Database Implementation

Learn to implement secure database operations with proper input validation and sanitization.

## Objectives
1. Set up parameterized queries
2. Implement input validation
3. Configure proper access controls
4. Set up encryption for sensitive data

## Initial Setup
\`\`\`javascript
const { Pool } = require('pg');
const validator = require('validator');

const pool = new Pool({
  // TODO: Add your database configuration
});

// TODO: Add your secure query functions
\`\`\``,
      tests: [
        "Test 1: SQL injection prevention",
        "Test 2: Input validation",
        "Test 3: Proper error handling",
      ],
      hints: [
        "Never concatenate strings to build queries",
        "Always validate and sanitize user input",
        "Use prepared statements for all queries",
      ]
    }
  },
  break: {
    sqlInjection: {
      description: `# SQL Injection Testing Lab

Practice identifying and exploiting SQL injection vulnerabilities safely in a controlled environment.

## Objectives
1. Identify vulnerable input fields
2. Craft SQL injection payloads
3. Extract database information
4. Document findings and fixes

## Target Application
\`\`\`sql
-- Example vulnerable query
SELECT * FROM users WHERE username = '$USER_INPUT' AND password = '$PASSWORD';
\`\`\``,
      tests: [
        "Test 1: Basic SQL injection",
        "Test 2: Blind SQL injection",
        "Test 3: Time-based SQL injection",
      ],
      hints: [
        "Try using single quotes to break the query",
        "UNION SELECT can help extract additional data",
        "Consider using SQLMap for automated testing",
      ]
    }
  },
  mitigate: {
    waf: {
      description: `# Web Application Firewall Lab

Learn to implement and configure a WAF to protect against common web attacks.

## Objectives
1. Set up ModSecurity
2. Configure OWASP Core Rule Set
3. Create custom rules
4. Monitor and analyze logs

## Initial Setup
\`\`\`nginx
# Basic ModSecurity configuration
SecRuleEngine On
SecRequestBodyAccess On
SecResponseBodyAccess On

# TODO: Add your WAF rules
\`\`\``,
      tests: [
        "Test 1: SQL injection blocking",
        "Test 2: XSS prevention",
        "Test 3: Rate limiting effectiveness",
      ],
      hints: [
        "Start with OWASP CRS basic rules",
        "Monitor false positives carefully",
        "Use anomaly scoring for better accuracy",
      ]
    }
  }
};

// Challenges data
export const challenges: Challenge[] = [
  { 
    id: 1, 
    title: 'Secure Authentication System', 
    phase: 'build',
    description: 'Build a secure authentication system with proper password hashing and session management.',
    difficulty: 'Medium', 
    points: 250, 
    completed: false,
    topics: ['Password Hashing', 'Session Management', 'OAuth 2.0'],
    tools: ['Node.js', 'bcrypt', 'JWT'],
    resources: ['OWASP Authentication Guidelines', 'JWT Best Practices'],
    template: 'authentication'
  },
  { 
    id: 2, 
    title: 'SQL Injection Lab', 
    phase: 'break',
    description: 'Find and exploit SQL injection vulnerabilities in a web application.',
    difficulty: 'Hard', 
    points: 500, 
    completed: true,
    topics: ['SQL Injection', 'Input Validation', 'Database Security'],
    tools: ['SQLMap', 'Burp Suite', 'OWASP ZAP'],
    resources: ['OWASP SQL Injection Guide', 'Web Security Academy'],
    template: 'sqlInjection'
  },
  { 
    id: 3, 
    title: 'WAF Implementation', 
    phase: 'mitigate',
    description: 'Implement a Web Application Firewall to protect against common attacks.',
    difficulty: 'Expert', 
    points: 750, 
    completed: false,
    topics: ['WAF Rules', 'Traffic Analysis', 'Attack Patterns'],
    tools: ['ModSecurity', 'Nginx', 'Fail2Ban'],
    resources: ['ModSecurity Handbook', 'WAF Configuration Guide'],
    template: 'waf'
  },
];

// Learning paths data
export const learningPaths = {
  build: [
    { icon: Lock, title: 'Authentication & Authorization', description: 'Learn to implement secure user authentication and role-based access control.' },
    { icon: Database, title: 'Secure Data Storage', description: 'Master encryption, secure database design, and data protection.' },
    { icon: Network, title: 'Network Security', description: 'Build secure network architectures and implement encryption.' },
    { icon: FileCode2, title: 'Secure Coding', description: 'Write secure code and implement security best practices.' },
  ],
  break: [
    { icon: Bug, title: 'Vulnerability Assessment', description: 'Learn to identify and assess security vulnerabilities.' },
    { icon: Target, title: 'Penetration Testing', description: 'Master the tools and techniques for ethical hacking.' },
    { icon: FileWarning, title: 'Exploit Development', description: 'Understand and develop proof-of-concept exploits.' },
    { icon: Server, title: 'Infrastructure Testing', description: 'Test security of servers and network infrastructure.' },
  ],
  mitigate: [
    { icon: ShieldCheck, title: 'Security Controls', description: 'Implement effective security controls and safeguards.' },
    { icon: Workflow, title: 'Incident Response', description: 'Develop and implement incident response procedures.' },
    { icon: Cpu, title: 'System Hardening', description: 'Harden systems against various types of attacks.' },
    { icon: Shield, title: 'Defense in Depth', description: 'Build layered security defenses for comprehensive protection.' },
  ]
};

// Phase themes
export const phaseThemes = {
  build: {
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    hover: 'hover:bg-emerald-700',
    border: 'border-emerald-500/30',
    gradient: 'from-emerald-600/50 to-transparent',
    icon: Lock,
    description: 'Build secure systems'
  },
  break: {
    primary: 'bg-red-600',
    secondary: 'bg-red-500/20',
    text: 'text-red-400',
    hover: 'hover:bg-red-700',
    border: 'border-red-500/30',
    gradient: 'from-red-600/50 to-transparent',
    icon: Bug,
    description: 'Break and test security'
  },
  mitigate: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-500/20',
    text: 'text-blue-400',
    hover: 'hover:bg-blue-700',
    border: 'border-blue-500/30',
    gradient: 'from-blue-600/50 to-transparent',
    icon: Shield,
    description: 'Implement defenses'
  }
};

// Initial conversation for AI assistant
export const initialConversation = [
  {
    role: 'assistant',
    content: "Welcome to CyberLabs! I'm your AI mentor, specialized in cybersecurity. Our learning approach follows the Build-Break-Mitigate methodology:\n\n- **Build**: Learn to create secure systems from the ground up\n- **Break**: Master the art of finding vulnerabilities\n- **Mitigate**: Develop skills to protect against threats\n\nWhat would you like to explore first?",
  },
]; 
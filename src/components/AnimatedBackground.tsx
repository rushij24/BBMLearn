import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Blue circuit-like lines */}
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <g>
          {/* Animated paths */}
          <motion.path
            d="M0,100 Q150,50 300,100 T600,100 T900,100 T1200,100 T1500,100 T1800,100"
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.3,
              transition: { 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop", 
                ease: "easeInOut" 
              }
            }}
          />
          <motion.path
            d="M0,200 Q150,150 300,200 T600,200 T900,200 T1200,200 T1500,200 T1800,200"
            fill="none"
            stroke="rgba(59, 130, 246, 0.15)" 
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.4,
              transition: { 
                duration: 5,
                repeat: Infinity,
                repeatType: "loop", 
                ease: "easeInOut",
                delay: 0.5 
              }
            }}
          />
          <motion.path
            d="M0,300 Q150,250 300,300 T600,300 T900,300 T1200,300 T1500,300 T1800,300"
            fill="none"
            stroke="rgba(59, 130, 246, 0.1)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.3,
              transition: { 
                duration: 6,
                repeat: Infinity,
                repeatType: "loop", 
                ease: "easeInOut",
                delay: 1
              }
            }}
          />
        </g>
      </svg>
      
      {/* Floating nodes/dots */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              opacity: Math.random() * 0.4 + 0.1
            }}
            animate={{
              y: [0, Math.random() * 60 - 30],
              x: [0, Math.random() * 60 - 30],
              opacity: [Math.random() * 0.4 + 0.1, Math.random() * 0.7 + 0.2],
              scale: [1, Math.random() * 1.5 + 0.5, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Animated circles */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.circle
          cx="10%"
          cy="20%"
          r="150"
          fill="none"
          stroke="rgba(59, 130, 246, 0.05)"
          strokeWidth="40"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.5, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
        <motion.circle
          cx="90%"
          cy="80%"
          r="150"
          fill="none"
          stroke="rgba(59, 130, 246, 0.05)"
          strokeWidth="40"
          initial={{ scale: 0 }}
          animate={{ 
            scale: [0, 1.5, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatDelay: 8,
            delay: 7
          }}
        />
      </svg>
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute rounded-full bg-blue-500/10 blur-3xl"
        style={{
          width: "300px",
          height: "300px",
          top: "20%",
          right: "10%"
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute rounded-full bg-blue-500/10 blur-3xl"
        style={{
          width: "350px",
          height: "350px",
          bottom: "10%",
          left: "5%"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 5
        }}
      />
    </div>
  );
};

export default AnimatedBackground; 
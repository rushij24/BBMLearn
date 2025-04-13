import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../components/AnimatedBackground';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Mock successful login
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 20 
      } 
    }
  };

  const formControlVariants = {
    initial: { scale: 1 },
    focus: { scale: 1.02, transition: { duration: 0.2 } }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Content */}
      <motion.div 
        className="max-w-md w-full space-y-8 relative z-10 bg-gray-900/70 p-8 rounded-xl backdrop-blur-sm border border-gray-800/50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.h1 
            className="text-4xl font-bold text-blue-500"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              delay: 0.1 
            }}
          >
            BBM Learn
          </motion.h1>
          <motion.h2 
            className="mt-6 text-2xl font-bold text-white"
            variants={itemVariants}
          >
            Sign in to your account
          </motion.h2>
        </motion.div>
        
        <motion.form 
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          {error && (
            <motion.div 
              className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded"
              variants={errorVariants}
              initial="hidden"
              animate="visible"
            >
              {error}
            </motion.div>
          )}
          
          <div className="rounded-md shadow-sm space-y-4">
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="sr-only">Email address</label>
              <motion.input
                whileFocus="focus"
                variants={formControlVariants}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "appearance-none relative block w-full px-3 py-3 border",
                  "bg-gray-800/90 border-gray-700 placeholder-gray-400 text-white rounded-md",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                )}
                placeholder="Email address"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="sr-only">Password</label>
              <motion.input
                whileFocus="focus"
                variants={formControlVariants}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "appearance-none relative block w-full px-3 py-3 border",
                  "bg-gray-800/90 border-gray-700 placeholder-gray-400 text-white rounded-md",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                )}
                placeholder="Password"
              />
            </motion.div>
          </div>

          <motion.div 
            className="flex items-center justify-between"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                Forgot your password?
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.03 }}
              whileTap={{ scale: isLoading ? 1 : 0.97 }}
              className={cn(
                "group relative w-full flex justify-center py-3 px-4 border border-transparent",
                "text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                "transition duration-150 ease-in-out",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <motion.span 
                    className="mr-2 h-4 w-4 rounded-full bg-white"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  ></motion.span>
                  Signing in...
                </div>
              ) : 'Sign in'}
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="text-center text-sm"
            variants={itemVariants}
          >
            <span className="text-gray-400">Don't have an account?</span>
            {' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
            >
              <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </motion.span>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage; 
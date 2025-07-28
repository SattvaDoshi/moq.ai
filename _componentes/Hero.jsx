"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Check, Star, Users, BarChart3, Zap, Menu, X, Brain, FileText, Calendar, Mic } from 'lucide-react';
import Header from './Header'; // Import your header

export default function IntegratedApp() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black relative overflow-hidden">
      {/* Modern animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply opacity-70 animate-blob blur-xl"></div>
        <div className="absolute top-0 -left-20 w-72 h-72 bg-green-500/10 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000 blur-xl"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000 blur-xl"></div>
      </div>
      
      <Header />
      <HeroSection />
      <Features />
      <Testimonials />
      <UpgradePlan />
      <Footer />
    </div>
  );
}

function HeroSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <section className="relative min-h-screen flex items-center py-28" id="hero">
      {/* Background with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black z-0"></div>
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/20 mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-green-500/10 mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero content */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            {/* Badge with glass effect */}
            <div className="inline-flex mb-6 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm bg-white/5 border border-white/10 shadow-sm text-blue-300">
              ✨ AI-Powered Interview Preparation Platform
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-green-400 to-purple-600">Master</span>
              <br />
              <span className="text-white">Your Interviews</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg font-light">
              AI-powered mock interviews, personalized study plans, and intelligent resume analysis to land your dream job.
            </p>
            
            {/* Modern form with glass effect */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0">
              <Input
                type="email"
                required
                placeholder="Enter your email to get started"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/5 backdrop-blur-sm border-white/20 focus:border-blue-500 rounded-lg shadow-sm text-white placeholder:text-gray-400"
              />
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg transition-all duration-300 rounded-lg" 
                size="lg"
              >
                Start Practicing <ChevronRight size={16} className="ml-1" />
              </Button>
            </form>
            
            {isSubmitted && (
              <AnimatePresence>
                <motion.div
                  className="mt-4 text-green-400 flex items-center justify-center md:justify-start"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check size={16} className="mr-1" /> Success! Check your inbox.
                </motion.div>
              </AnimatePresence>
            )}
            
            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center text-gray-400">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                  <Check size={12} className="text-green-400" />
                </div>
                Free practice interviews
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                  <Check size={12} className="text-green-400" />
                </div>
                Personalized feedback
              </div>
              <div className="flex items-center text-gray-400">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                  <Check size={12} className="text-green-400" />
                </div>
                Resume optimization
              </div>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="md:w-1/2">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {/* Glass card effect */}
              <div className="absolute -top-6 -left-6 right-6 bottom-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl z-0"></div>
              
              {/* Mock dashboard image */}
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border border-white/20 bg-gray-800/50 backdrop-blur-sm">
                <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">InterviewAce Dashboard</h3>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-500/20 rounded p-3 flex items-center justify-between">
                      <span className="text-gray-300">Mock Interviews Completed</span>
                      <span className="text-blue-400 font-bold">47</span>
                    </div>
                    <div className="bg-green-500/20 rounded p-3 flex items-center justify-between">
                      <span className="text-gray-300">Study Goals This Week</span>
                      <span className="text-green-400 font-bold">5/7</span>
                    </div>
                    <div className="bg-purple-500/20 rounded p-3 flex items-center justify-between">
                      <span className="text-gray-300">Resume Score</span>
                      <span className="text-purple-400 font-bold">92%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute top-4 right-0 transform translate-x-1/3 bg-gray-800/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-3 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                    <Mic size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Next Interview</div>
                    <div className="text-sm font-medium text-white">Frontend Dev</div>
                  </div>
                </div>
              </div>
              
              {/* Floating status */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm border border-white/20 rounded-full shadow-lg px-4 py-2 z-20 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">AI Coach Ready</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { 
      icon: <Mic size={24} />, 
      color: "from-blue-500 to-indigo-600",
      title: 'AI Mock Interviews', 
      desc: 'Practice with AI-powered interviews based on job descriptions or your resume. Get real-time feedback and improve your performance.' 
    },
    { 
      icon: <Calendar size={24} />, 
      color: "from-green-500 to-teal-600",
      title: 'Personalized Study Planner', 
      desc: 'AI creates custom study schedules based on your target role, current skills, and available time to maximize your preparation.' 
    },
    { 
      icon: <FileText size={24} />, 
      color: "from-purple-500 to-pink-600",
      title: 'Resume Analyzer', 
      desc: 'Advanced AI analyzes your resume, suggests improvements, and optimizes it for ATS systems and specific job requirements.' 
    }
  ];
  
  return (
    <section id="features" className="py-28 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full mix-blend-multiply opacity-50 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute left-0 bottom-0 h-96 w-96 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full mix-blend-multiply opacity-50 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Badge with glass effect */}
          <div className="inline-flex items-center mb-6 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm bg-white/5 shadow-sm border border-blue-500/20 text-blue-300">
            <span className="bg-blue-500/20 rounded-full w-5 h-5 flex items-center justify-center mr-2">
              <Brain size={12} className="text-blue-400" />
            </span>
            Complete Interview Preparation
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Everything You Need to Ace Interviews
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From practice interviews to resume optimization, our AI-powered platform prepares you for every aspect of the job search process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="relative h-full group">
                {/* Glass card effect */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:border-blue-500/30 group-hover:bg-white/10"></div>
                
                <div className="relative p-8 h-full flex flex-col">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{feature.desc}</p>
                  
                  <div className="mt-auto">
                    <Button 
                      variant="ghost" 
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 flex items-center group"
                    >
                      <span>Try it now</span>
                      <div className="ml-2 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500/30">
                        <ChevronRight size={14} className="text-blue-400" />
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center shadow-lg"
          >
            <h3 className="text-5xl font-bold text-white mb-2">89%</h3>
            <p className="text-gray-400">Success rate improvement</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center shadow-lg"
          >
            <h3 className="text-5xl font-bold text-white mb-2">10k+</h3>
            <p className="text-gray-400">Mock interviews completed</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center shadow-lg"
          >
            <h3 className="text-5xl font-bold text-white mb-2">4.9/5</h3>
            <p className="text-gray-400">Average user rating</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { 
      name: 'Alex Kumar', 
      position: 'Software Engineer at Google',
      text: 'InterviewAce helped me land my dream job at Google! The AI mock interviews were incredibly realistic and the feedback was spot-on.',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      rating: 5
    },
    { 
      name: 'Maria Rodriguez', 
      position: 'Product Manager at Microsoft',
      text: 'The study planner feature is amazing. It created a perfect 3-week preparation schedule that got me ready for my PM interviews.',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5
    },
    { 
      name: 'David Chen', 
      position: 'Data Scientist at Netflix',
      text: 'The resume analyzer increased my response rate by 300%. Now I understand exactly what recruiters are looking for.',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      rating: 5
    }
  ];
  
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-500/30">
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Join Thousands Who Landed Their Dream Jobs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real stories from real people who transformed their interview skills with InterviewAce.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30 overflow-visible">
                <CardContent className="pt-8 relative">
                  <div className="absolute -top-6 left-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-md">
                      <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 italic mb-6">"{review.text}"</p>
                  
                  <div>
                    <div className="font-semibold text-white">{review.name}</div>
                    <div className="text-sm text-gray-400">{review.position}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/50">
            Read More Success Stories <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function UpgradePlan() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        '3 AI mock interviews per month',
        'Basic resume analysis',
        'Simple study planner',
        'Email support',
        'Interview question bank access'
      ],
      buttonText: 'Get Started Free',
      isPrimary: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: '/month',
      description: 'For serious job seekers',
      features: [
        'Unlimited AI mock interviews',
        'Advanced resume optimization',
        'Personalized study plans',
        'Interview feedback & scoring',
        'Job-specific interview prep',
        'Priority support',
        'Progress tracking & analytics'
      ],
      buttonText: 'Start 7-Day Free Trial',
      isPrimary: true
    },
    {
      name: 'Premium',
      price: '$39',
      period: '/month',
      description: 'For career transformation',
      features: [
        'Everything in Pro',
        '1-on-1 career coaching sessions',
        'LinkedIn profile optimization',
        'Salary negotiation guidance',
        'Industry-specific prep modules',
        'Mock interviews with real experts',
        'Job application tracking'
      ],
      buttonText: 'Upgrade to Premium',
      isPrimary: false
    }
  ];
  
  return (
    <section id="plans" className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Choose Your Success Plan</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Start free and upgrade as you advance in your career. No hidden fees, cancel anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className={`flex flex-col h-full w-full overflow-hidden border backdrop-blur-sm ${
                plan.isPrimary 
                  ? 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-blue-500/5 shadow-xl shadow-blue-500/20' 
                  : 'border-white/10 bg-white/5'
              }`}>
                {plan.isPrimary && (
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-center text-sm py-2 font-medium">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.isPrimary ? 'pb-0' : ''}`}>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 text-4xl font-bold text-white">
                    {plan.price}
                    {plan.period && <span className="text-sm text-gray-400">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check size={16} className="text-green-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button 
                    className={`w-full ${
                      plan.isPrimary 
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg' 
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-gray-400 flex items-center justify-center">
          <Check size={16} className="text-green-400 mr-2" />
          All plans include 7-day free trial. No credit card required to start.
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    Product: ['Mock Interviews', 'Study Planner', 'Resume Analyzer', 'Progress Tracking', 'Mobile App'],
    Resources: ['Interview Tips', 'Career Blog', 'Success Stories', 'Help Center', 'Video Tutorials'],
    Company: ['About Us', 'Careers', 'Press Kit', 'Contact', 'Partners'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Refund Policy']
  };
  
  return (
    <footer className="bg-black border-t border-white/10 text-gray-300 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="text-2xl font-bold text-white mb-4 bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              InterviewAce
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Master your interviews with AI-powered practice, personalized study plans, and intelligent resume optimization.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} InterviewAce. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-gray-500 text-sm">
            Ace your interviews with AI 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}

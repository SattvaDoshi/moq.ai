"use client"
import { useUser } from '@clerk/nextjs'
import { Target, Sparkles, TrendingUp, Calendar, Settings } from 'lucide-react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Welcome() {
    const { user, isLoaded } = useUser()
    
    // Get current time for appropriate greeting
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return "Good morning"
        if (hour < 17) return "Good afternoon"
        return "Good evening"
    }

    // Format today's date
    const getTodaysDate = () => {
        const today = new Date()
        return today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    // Format short date for mobile
    const getShortDate = () => {
        const today = new Date()
        return today.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        })
    }

    // Loading state
    if (!isLoaded) {
        return (
            <div className="relative overflow-hidden mx-5">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-6  rounded-2xl shadow-xl animate-pulse">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <div className="h-4 bg-white/10 rounded mb-2 w-24"></div>
                            <div className="h-6 bg-white/10 rounded mb-1 w-48 hidden md:block"></div>
                            <div className="h-4 bg-white/10 rounded w-64 hidden md:block"></div>
                        </div>
                        <div className="w-12 h-12 md:w-15 md:h-15 bg-white/10 rounded-full"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative overflow-hidden mx-5">
            {/* Background with subtle animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-2xl"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-green-500/10 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
            
            {/* Glass morphism card */}
            <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-4 md:p-6 rounded-2xl shadow-xl hover:bg-white/10 transition-all duration-300">
                
                {/* Mobile View */}
                <div className="md:hidden flex justify-between items-center">
                    {/* Mobile Greeting and Date */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                            <Target size={16} className="text-white" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-400">
                                    {getGreeting()}
                                </span>
                                <span className="text-lg font-bold text-white">
                                    {user?.firstName || 'Ace'}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                                <Calendar size={10} className="text-blue-400" />
                                <span className="text-xs text-gray-400">
                                    {getShortDate()}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile Profile */}
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-600 rounded-full animate-pulse opacity-75"></div>
                        <div className="relative bg-gray-900 rounded-full p-0.5">
                            <UserButton 
                                appearance={{
                                    elements: {
                                        avatarBox: "w-10 h-10 rounded-full border border-white/20 shadow-lg",
                                        userButtonPopoverCard: "bg-gray-800/95 backdrop-blur-xl border border-white/10 shadow-2xl",
                                        userButtonPopoverActionButton: "text-gray-300 hover:text-white hover:bg-white/10 transition-colors",
                                        userButtonPopoverActionButtonText: "text-gray-300",
                                        userButtonPopoverActionButtonIcon: "text-gray-400",
                                        userButtonPopoverFooter: "border-t border-white/10",
                                    },
                                    variables: {
                                        colorBackground: '#1f2937',
                                        colorText: '#f9fafb',
                                        colorTextSecondary: '#9ca3af',
                                        colorPrimary: '#3b82f6',
                                    }
                                }}
                            />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-gray-900 shadow-sm animate-pulse"></div>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <div className="flex justify-between items-start">
                        {/* Welcome Content */}
                        <div className="flex-1">
                            {/* Date and Greeting Section */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                                        <Target size={14} className="text-white" />
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        {getGreeting()}
                                    </span>
                                </div>
                                
                                {/* Today's Date */}
                                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    <Calendar size={12} className="text-blue-400" />
                                    <span className="text-xs text-gray-300 font-medium">
                                        {getTodaysDate()}
                                    </span>
                                </div>
                            </div>
                            
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                                Welcome back, {user?.firstName || user?.fullName || 'Interview Ace'}! 👋
                            </h2>
                            
                            <p className="text-gray-400 text-sm md:text-base mb-4">
                                Ready to ace your next interview? Let's practice together.
                            </p>
                            
                            {/* User Info Pills */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {user?.emailAddresses?.[0]?.emailAddress && (
                                    <div className="flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-500/20">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-blue-300 font-medium">
                                            {user.emailAddresses[0].emailAddress.split('@')[0]}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="flex items-center space-x-2 bg-green-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-500/20">
                                    <TrendingUp size={10} className="text-green-400" />
                                    <span className="text-xs text-green-300 font-medium">Pro Member</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* User Profile Section with Clerk UserButton */}
                        <div className="flex flex-col items-center space-y-3 ml-6">
                            {/* Enhanced UserButton with custom appearance */}
                            <div className="relative">
                                {/* Animated ring around avatar */}
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-green-600 rounded-full animate-pulse opacity-75"></div>
                                <div className="relative bg-gray-900 rounded-full p-1">
                                    <UserButton 
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-14 h-14 rounded-full border-2 border-white/20 shadow-lg hover:scale-105 transition-transform duration-300",
                                                userButtonPopoverCard: "bg-gray-800/95 backdrop-blur-xl border border-white/10 shadow-2xl",
                                                userButtonPopoverActionButton: "text-gray-300 hover:text-white hover:bg-white/10 transition-colors",
                                                userButtonPopoverActionButtonText: "text-gray-300",
                                                userButtonPopoverActionButtonIcon: "text-gray-400",
                                                userButtonPopoverFooter: "border-t border-white/10",
                                            },
                                            variables: {
                                                colorBackground: '#1f2937',
                                                colorText: '#f9fafb',
                                                colorTextSecondary: '#9ca3af',
                                                colorPrimary: '#3b82f6',
                                            }
                                        }}
                                        userProfileProps={{
                                            appearance: {
                                                elements: {
                                                    card: "bg-gray-800/95 backdrop-blur-xl border border-white/10",
                                                    headerTitle: "text-white",
                                                    headerSubtitle: "text-gray-400",
                                                },
                                                variables: {
                                                    colorBackground: '#1f2937',
                                                    colorText: '#f9fafb',
                                                    colorTextSecondary: '#9ca3af',
                                                    colorPrimary: '#3b82f6',
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                {/* Online status indicator */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 shadow-sm animate-pulse"></div>
                            </div>
                            
                            {/* User Status Badge */}
                            <div className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-gray-300 font-medium">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome

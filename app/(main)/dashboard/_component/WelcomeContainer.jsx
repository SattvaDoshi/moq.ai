'use client'
import { useUser } from '@/app/provider';
import React from 'react';
import { Sparkles, User, Calendar, Clock } from 'lucide-react';

const WelcomeContainer = () => {
    const { user } = useUser();

    const getCurrentGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const getCurrentTime = () => {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="w-[80vw] px-5">
            <div className=" w-full overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-pink-500/20"></div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Main Content */}
                <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        {/* Greeting & Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm sm:text-base text-purple-300 font-medium">
                                    {getCurrentGreeting()}
                                </span>
                                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
                                {user?.name || 'Welcome Back!'}
                            </h1>

                            {/* Date & Time */}

                        </div>

                        {/* Profile Image */}
                        <div className="relative shrink-0">
                            <div className="flex mt-4 gap-4 flex-wrap sm:flex-nowrap">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                    <Clock className="w-4 h-4 text-purple-400" />
                                    <span className="text-white/80 text-sm font-medium">
                                        {getCurrentTime()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                    <Calendar className="w-4 h-4 text-blue-400" />
                                    <span className="text-white/80 text-sm font-medium hidden sm:inline">
                                        {getCurrentDate()}
                                    </span>
                                    <span className="text-white/80 text-sm font-medium sm:hidden">
                                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeContainer;

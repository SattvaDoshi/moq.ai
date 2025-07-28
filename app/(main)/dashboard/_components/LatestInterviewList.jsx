"use client"
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/superbaseClient'
import { Video, Plus, Sparkles, TrendingUp, Calendar } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'
import Link from 'next/link'

function LatestInterViewList() {
    const [interviewList, setInterviewList] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useUser();

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async() => {
        setLoading(true)
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select('*')
                .eq('userEmail', user?.email)
                .order('id', {ascending: false})
                .limit(8)
         
            console.log(Interviews);
            setInterviewList(Interviews || []);
        } catch (error) {
            console.error('Error fetching interviews:', error)
        } finally {
            setLoading(false)
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className='my-8 mx-5'>
                <div className="flex items-center justify-between mb-6">
                    <div className="h-8 bg-white/10 rounded-lg w-64 animate-pulse"></div>
                    <div className="h-6 bg-white/10 rounded-lg w-24 animate-pulse"></div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 animate-pulse">
                            <div className="flex justify-between items-center mb-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
                                <div className="w-20 h-6 bg-white/10 rounded-full"></div>
                            </div>
                            <div className="h-6 bg-white/10 rounded mb-2 w-3/4"></div>
                            <div className="h-4 bg-white/10 rounded mb-4 w-1/2"></div>
                            <div className="h-10 bg-white/10 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='my-8 mx-5'>
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                        <Calendar size={16} className="text-white" />
                    </div>
                    <h2 className='text-2xl md:text-3xl font-bold text-white'>
                        Your Interview History
                    </h2>
                </div>
                
                {/* Stats badge */}
                {interviewList?.length > 0 && (
                    <div className="flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-500/20">
                        <TrendingUp size={12} className="text-blue-400" />
                        <span className="text-xs text-blue-300 font-medium">
                            {interviewList.length} interviews
                        </span>
                    </div>
                )}
            </div>

            {/* Empty State */}
            {interviewList?.length === 0 && !loading && (
                <div className="relative overflow-hidden">
                    {/* Background animation */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-2xl"></div>
                    <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-5 left-5 w-16 h-16 bg-green-500/10 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
                    
                    {/* Glass morphism card */}
                    <div className='relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl text-center'>
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                            <Video className='h-10 w-10 text-blue-400'/>
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-2">
                            Start Your Interview Journey
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            You haven't created any mock interviews yet. Start practicing with AI-powered interviews tailored to your goals.
                        </p>
                        
                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/dashboard/create-interview">
                                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg transition-all duration-300">
                                    <Plus className="mr-2" size={16} />
                                    Create Job-Based Interview
                                </Button>
                            </Link>
                            <Link href="/dashboard/create-resume-interview">
                                <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                                    <Sparkles className="mr-2" size={16} />
                                    Create Resume-Based Interview
                                </Button>
                            </Link>
                        </div>
                        
                        {/* Motivational message */}
                        <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                            <div className="flex items-center justify-center space-x-2">
                                <Sparkles size={14} className="text-purple-400" />
                                <span className="text-sm text-purple-300 font-medium">
                                    Pro tip: Start with resume-based interviews to build confidence!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Interview Grid */}
            {interviewList?.length > 0 && (
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {interviewList.map((interview, index) => (
                            <InterviewCard interview={interview} key={index}/>
                        ))}
                    </div>
                    
                    {/* Show more button if there are exactly 8 interviews (limit) */}
                    {interviewList.length === 8 && (
                        <div className="text-center mt-8">
                            <Button 
                                variant="outline" 
                                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
                                onClick={() => {
                                    // Add logic to load more interviews
                                    console.log('Load more interviews')
                                }}
                            >
                                View All Interviews
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default LatestInterViewList

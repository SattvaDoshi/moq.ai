import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send, Calendar, Users, Clock, CheckCircle2 } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React, { useState } from 'react'

function InterviewCard({interview, viewDetail=false}) {
    const [copied, setCopied] = useState(false)
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/interview/" + interview?.interview_id
      
    const copyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const onSend = () => {
        window.location.href = `mailto:account@tech.com?subject=InterviewAce Mock Interview Link&body=Hi there!%0A%0AI'd like to share this AI-powered mock interview with you:%0A%0AInterview Link: ${url}%0A%0AThis is a practice interview for the ${interview?.jobPosition} position. You can use this to practice and improve your interview skills.%0A%0ABest regards!`
    }

    return (
        <div className='relative group overflow-hidden'>
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Glass morphism card */}
            <div className='relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300 hover:scale-[1.02]'>
                
                {/* Header */}
                <div className='flex items-center justify-between mb-4'>
                    <div className='relative'>
                        {/* Interview type icon */}
                        <div className='h-12 w-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg'>
                            <Calendar className='text-white' size={20} />
                        </div>
                        {/* Status indicator */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 shadow-sm animate-pulse"></div>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Clock size={12} className="text-blue-400" />
                        <span className='text-xs text-gray-300 font-medium'>
                            {moment(interview?.created_at).format('MMM DD, YYYY')}
                        </span>
                    </div>
                </div>

                {/* Job Position */}
                <h2 className='font-bold text-xl text-white mb-2 group-hover:text-blue-200 transition-colors'>
                    {interview?.jobPosition || 'Mock Interview'}
                </h2>

                {/* Interview Details */}
                <div className='flex items-center justify-between mb-4'>
                    <div className="flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-500/20">
                        <Clock size={12} className="text-blue-400" />
                        <span className='text-xs text-blue-300 font-medium'>
                            {interview?.duration || '30 min'}
                        </span>
                    </div>
                </div>

                {/* Interview Status */}
                <div className="mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle2 size={14} className="text-green-400" />
                        <span className="text-gray-400">Ready for practice</span>
                    </div>
                </div>

                {/* Action Buttons */}
                {!viewDetail ? (
                    <div className='flex gap-3 mt-6'>
                        <Button 
                            variant='outline' 
                            className='flex-1 cursor-pointer bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50' 
                            onClick={copyLink}
                        >
                            <Copy className='mr-2' size={16} />
                            {copied ? 'Copied!' : 'Copy Link'}
                        </Button>
                    </div>
                ) : (
                    <Link href={'/scheduled-interviews/' + interview?.interview_id + "/details"}>
                        <Button 
                            variant='outline' 
                            className='mt-6 w-full bg-white/10 text-white border-white/20 hover:bg-blue-500/20 hover:border-blue-500/50 backdrop-blur-sm transition-all duration-300 group'
                        >
                            <span className="flex items-center justify-center">
                                View Details
                                <ArrowRight className='ml-2 group-hover:translate-x-1 transition-transform duration-300' size={16} />
                            </span>
                        </Button>
                    </Link>
                )}

            </div>
        </div>
    )
}

export default InterviewCard

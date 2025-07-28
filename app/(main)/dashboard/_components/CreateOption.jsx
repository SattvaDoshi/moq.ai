import { Video, FileText, Briefcase, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOption() {
  const options = [
    {
      href: '/dashboard/create-interview',
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Create Job-Based Interview',
      desc: 'Practice interviews based on specific job descriptions and requirements',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      href: '/dashboard/create-resume-interview',
      icon: <FileText className="h-6 w-6" />,
      title: 'Create Resume-Based Interview',
      desc: 'AI interviews tailored to your resume skills and experience',
      gradient: 'from-green-500 to-teal-600',
      bgGradient: 'from-green-500/20 to-teal-500/20',
      borderColor: 'border-green-500/30'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Interview Type</h2>
        <p className="text-gray-400">Select the type of mock interview you'd like to practice</p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((option, index) => (
          <Link
            key={index}
            href={option.href}
            className="group relative overflow-hidden"
          >
            {/* Glass morphism card */}
            <div className="relative h-full bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02]">
              
              {/* Background gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 bg-gradient-to-br ${option.gradient} text-white rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors">
                    {option.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {option.desc}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-400">
                      Ready to start
                    </span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:translate-x-1">
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      
    </div>
  )
}

export default CreateOption

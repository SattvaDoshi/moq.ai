"use client"
import { useUser, SignOutButton, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Menu, X, Brain } from 'lucide-react'

function Header() {
  const router = useRouter()
  const { isSignedIn, user, isLoaded } = useUser()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = () => {
    router.push('/auth')
  }

  // Show consistent loading state during SSR and before mount
  if (!mounted || !isLoaded) {
    return (
      <header className='sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md'>
        <div className='container mx-auto px-6'>
          <div className='flex justify-between items-center h-16'>
            <Link href='/' className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                <Brain size={20} className="text-white" />
              </div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                InterviewAce
              </div>
            </Link>
            <div className='flex items-center gap-4'>
              <div className="animate-pulse bg-gray-700 h-10 w-24 rounded-lg"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className='sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md'>
      <div className='container mx-auto px-6'>
        <div className='flex justify-between items-center h-16'>
          <Link href='/' className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
              InterviewAce
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors">
              Success Stories
            </Link>
            <Link href="#plans" className="text-gray-300 hover:text-blue-400 transition-colors">
              Pricing
            </Link>
          </nav>
          
          <div className='hidden md:flex items-center gap-4'>
            {isSignedIn ? (
              <>
                {/* Optional: Display user info */}
                {user && (
                  <div className='flex items-center gap-2'>
                    <span className="text-sm text-gray-400">
                      Hi, {user.firstName || user.emailAddresses[0]?.emailAddress.split('@')[0]}
                    </span>
                  </div>
                )}
                
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                    Dashboard
                  </Button>
                </Link>
                
                <SignOutButton>
                  <Button variant="outline" onClick={handleSignOut} className="border-white/20 cursor-pointer text-gray-700 hover:bg-white/10 hover:text-white">
                    Sign Out
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                    Start Practicing
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link href="#testimonials" className="text-gray-300 hover:text-blue-400 transition-colors">
                Success Stories
              </Link>
              <Link href="#plans" className="text-gray-300 hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              
              <div className="pt-4 border-t border-white/10">
                {isSignedIn ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/dashboard">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                        Dashboard
                      </Button>
                    </Link>
                    <SignOutButton>
                      <Button variant="outline" onClick={handleSignOut} className="w-full border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                        Sign Out
                      </Button>
                    </SignOutButton>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/sign-in">
                      <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10 hover:text-white">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/sign-up">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                        Start Practicing
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

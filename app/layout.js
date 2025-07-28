import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InterviewAce - Master Your Interviews with AI",
  description: "AI-powered mock interviews, personalized study plans, and intelligent resume analysis to help you land your dream job. Practice with confidence and ace every interview.",
  keywords: "AI interviews, mock interviews, interview preparation, resume analyzer, study planner, job interview practice",
  authors: [{ name: "InterviewAce Team" }],
  creator: "InterviewAce",
  publisher: "InterviewAce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://interviewace.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "InterviewAce - Master Your Interviews with AI",
    description: "AI-powered mock interviews, personalized study plans, and intelligent resume analysis to help you land your dream job.",
    url: 'https://interviewace.com', // Replace with your actual domain
    siteName: 'InterviewAce',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'InterviewAce - AI-Powered Interview Preparation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "InterviewAce - Master Your Interviews with AI",
    description: "AI-powered mock interviews, personalized study plans, and intelligent resume analysis to help you land your dream job.",
    images: ['/og-image.jpg'], // Same as OG image
    creator: '@interviewace', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1e40af' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: 'dark',
        variables: {
          colorPrimary: '#3b82f6', // Blue-500
          colorPrimaryForeground: '#ffffff',
          colorBackground: '#111827', // Gray-900
          colorInputBackground: '#1f2937', // Gray-800
          colorInputText: '#f9fafb', // Gray-50
          colorText: '#f9fafb', // Gray-50
          colorTextSecondary: '#9ca3af', // Gray-400
          colorSuccess: '#10b981', // Green-500
          colorDanger: '#ef4444', // Red-500
          colorWarning: '#f59e0b', // Yellow-500
          borderRadius: '0.75rem', // Rounded-xl
        },
        elements: {
          formButtonPrimary: {
            background: 'linear-gradient(to right, #2563eb, #16a34a)', // Blue to green gradient
            '&:hover': {
              background: 'linear-gradient(to right, #1d4ed8, #15803d)',
            },
          },
          card: {
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          headerTitle: {
            color: '#f9fafb',
          },
          headerSubtitle: {
            color: '#9ca3af',
          },
        },
      }}
    >
      <html lang="en" className="dark">
        <head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Additional meta tags for better SEO */}
          <meta name="theme-color" content="#1e40af" />
          <meta name="color-scheme" content="dark" />
          <meta name="application-name" content="InterviewAce" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="InterviewAce" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#1e40af" />
          <meta name="msapplication-tap-highlight" content="no" />
          
          {/* Schema.org structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "InterviewAce",
                "description": "AI-powered mock interviews, personalized study plans, and intelligent resume analysis to help you land your dream job.",
                "url": "https://interviewace.com", // Replace with your actual domain
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock"
                },
                "featureList": [
                  "AI-powered mock interviews",
                  "Personalized study planning",
                  "Resume analysis and optimization",
                  "Interview feedback and scoring",
                  "Progress tracking"
                ]
              })
            }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen`}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

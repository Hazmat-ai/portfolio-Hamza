import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hamzarizvi.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hamza Rizvi | Software Developer & Computer Science Student',
    template: '%s | Hamza Rizvi',
  },
  description:
    "Explore Hamza Rizvi's software development portfolio featuring full-stack applications, AI/ML projects, robotics, and UX-focused engineering.",
  keywords: [
    'Hamza Rizvi',
    'software developer',
    'computer science',
    'full-stack developer',
    'AI ML',
    'robotics',
    'UX design',
    'Wilfrid Laurier University',
    'Next.js',
    'React',
    'Python',
    'TypeScript',
  ],
  authors: [{ name: 'Hamza Rizvi' }],
  creator: 'Hamza Rizvi',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteUrl,
    siteName: 'Hamza Rizvi Portfolio',
    title: 'Hamza Rizvi | Software Developer & Computer Science Student',
    description:
      "Explore Hamza Rizvi's software development portfolio featuring full-stack applications, AI/ML projects, robotics, and UX-focused engineering.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hamza Rizvi - Software Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamza Rizvi | Software Developer & Computer Science Student',
    description:
      "Explore Hamza Rizvi's software development portfolio featuring full-stack applications, AI/ML projects, robotics, and UX-focused engineering.",
    images: ['/og-image.png'],
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
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Hamza Rizvi',
  url: siteUrl,
  sameAs: [
    'https://github.com/Hazmat-ai',
    'https://www.linkedin.com/in/hamzarizvi-cs',
  ],
  jobTitle: 'Software Developer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Wilfrid Laurier University',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mississauga',
    addressRegion: 'Ontario',
    addressCountry: 'CA',
  },
  email: 'hamzarizvi006@gmail.com',
  knowsAbout: [
    'Software Development',
    'Full-Stack Development',
    'AI/ML',
    'Computer Vision',
    'Robotics',
    'UX Design',
    'React',
    'Python',
    'TypeScript',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0f] text-white antialiased">
        <SmoothScrollProvider>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

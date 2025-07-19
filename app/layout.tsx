
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { PT_Sans } from 'next/font/google';
import { siteConfig } from '@/lib/metadata';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  // The icons are now handled directly in the head of the document for faster loading.
  // This helps prevent the default Firebase favicon from appearing first.
  // We leave this here for Next.js to still have context, but the direct links are more important.
  icons: {
    icon: '/images/Logo-BP.png',
    shortcut: '/images/Logo-BP.png',
    apple: '/images/Logo-BP.png',
  },
  openGraph: {
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    images: [siteConfig.ogImage], 
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
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/Logo-BP.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+965-9400-7464',
      contactType: 'Customer Service',
    },
     sameAs: siteConfig.socialLinks,
  };

  return (
    <html lang="en" className={`${ptSans.variable}`}>
      <head>
        <link rel="icon" href="/images/Logo-BP.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/Logo-BP.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

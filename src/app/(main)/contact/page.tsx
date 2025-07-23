import { Suspense } from 'react';
import { ContactPageClient } from '@/components/kidsverse/contact-page-client';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

const pageTitle = 'Contact Bright Planet Hub in Salmiya, Kuwait';
const pageDescription = "We'd love to hear from you! Contact Bright Planet Hub in Salmiya for questions about our kids classes, venue rental, or career counselling services.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/contact`,
  }
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactPageClient />
    </Suspense>
  );
}

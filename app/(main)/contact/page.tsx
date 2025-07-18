import { Suspense } from 'react';
import { ContactPageClient } from '@/components/kidsverse/contact-page-client';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

const pageTitle = 'Contact Us';
const pageDescription = "We'd love to hear from you! Whether you have questions, want to book a class, or rent our venue, feel free to reach out to Bright Planet Hub.";

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

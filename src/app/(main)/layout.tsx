import { Navbar } from '@/components/kidsverse/navbar';
import { Footer } from '@/components/kidsverse/footer';
import { WhatsAppWidget } from '@/components/kidsverse/whatsapp-widget';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // The default metadata is handled in the root layout.tsx
  // We can add specific metadata for all pages in this layout group if needed.
  // For example, to add a suffix to all titles in this group:
  title: {
    template: `%s | ${siteConfig.name}`,
  },
  // Ensure the canonical URL is set for each page within its own file.
};


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

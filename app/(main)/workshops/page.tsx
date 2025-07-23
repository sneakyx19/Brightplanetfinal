
"use client";

import { useState } from 'react';
import { WorkshopCard } from '@/components/kidsverse/workshop-card';
import { workshopsData, type WorkshopInfo } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { WorkshopSignupForm } from '@/components/kidsverse/workshop-signup-form';

// Metadata for this page should be defined in a parent server component or layout if needed,
// but since this page content is dynamic based on data, we will add structured data here.
import { siteConfig } from '@/lib/metadata';
import Head from 'next/head';

export default function WorkshopsPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignupClick = (workshop: WorkshopInfo) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };
  
  // Generate structured data for all workshops
  const eventsStructuredData = workshopsData.map(workshop => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: workshop.title,
    description: workshop.description,
    image: `${siteConfig.url}${workshop.image}`,
    startDate: workshop.date, // This should be in ISO format in a real app
    endDate: workshop.date,   // This should be in ISO format in a real app
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: siteConfig.name,
      address: {
          '@type': 'PostalAddress',
          streetAddress: 'Villa 8, Medinaty Tower, Block 5',
          addressLocality: 'Salmiya',
          addressCountry: 'KW'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url
    },
    offers: {
      '@type': 'Offer',
      price: workshop.isFree ? "0" : "To be confirmed",
      priceCurrency: 'KWD',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/workshops`,
    }
  }));

  return (
    <>
     <Head>
        <title>Upcoming Kids Workshops in Salmiya | Bright Planet Hub</title>
        <meta name="description" content="Discover exciting upcoming kids workshops in Salmiya, Kuwait! Our sessions complement our courses, offering fun, hands-on experiences to help your child explore new skills." />
        <script type="application/ld+json">
          {JSON.stringify(eventsStructuredData)}
        </script>
      </Head>
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Upcoming Workshops</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Discover our exciting upcoming workshops! These sessions are designed to complement our courses, offering fun, hands-on experiences to help your child explore new skills and spark their creativity.
          </p>
        </section>

        {workshopsData.length > 0 ? (
          <section className="grid md:grid-cols-2 gap-8">
            {workshopsData.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} onSignup={handleSignupClick} />
            ))}
          </section>
        ) : (
          <section className="text-center py-10">
            <p className="text-xl text-muted-foreground">No upcoming workshops at the moment. Check back soon!</p>
          </section>
        )}

        {selectedWorkshop && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl text-primary">Sign Up for {selectedWorkshop.title}</DialogTitle>
                <DialogDescription>
                  Fill in your details below to register for this workshop.
                </DialogDescription>
              </DialogHeader>
              <WorkshopSignupForm workshop={selectedWorkshop} onFormSubmitSuccess={handleModalClose} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
}

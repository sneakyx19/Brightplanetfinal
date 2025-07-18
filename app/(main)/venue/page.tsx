
import Image from 'next/image';
import { venueInfo } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckSquare } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';

const pageTitle = 'Venue & Office Space Rental';
const pageDescription = 'Rent our spacious, child-friendly venue for birthday parties, workshops, and activities. We also offer professional office workspace rentals with modern amenities.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/venue`,
    images: venueInfo.images.map(img => ({
        url: `${siteConfig.url}${img.src}`,
        width: 800,
        height: 600,
        alt: img.alt,
    }))
  }
};


export default function VenuePage() {
  const venueStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Place',
      name: venueInfo.name,
      description: venueInfo.description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '5 6th St, Lane 2nd, Block 5',
        addressLocality: 'Salmiya',
        addressCountry: 'KW',
      },
      telephone: '+965-9400-7464',
      photo: venueInfo.images.map(img => `${siteConfig.url}${img.src}`),
      url: `${siteConfig.url}/venue`,
      amenityFeature: venueInfo.features.map(feature => ({
          '@type': 'LocationFeatureSpecification',
          name: feature.name,
          value: 'True',
      })),
    };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(venueStructuredData) }}
      />
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">{venueInfo.name}</h1>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
          {venueInfo.description}
        </p>
      </section>

      {/* Image Gallery */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {venueInfo.images.map((img, index) => (
          <div key={index} className="relative w-full rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px]">
            <Image 
              src={img.src} 
              alt={img.alt} 
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              style={{objectFit: 'cover'}}
              className="transition-transform duration-300 hover:scale-105"
              data-ai-hint={img.dataAiHint}
              priority={index < 2}
            />
          </div>
        ))}
      </section>
      
      <section className="grid md:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Venue Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {venueInfo.features.map((feature) => (
                <li key={feature.name} className="flex items-start">
                  <feature.Icon className="h-6 w-6 text-accent-foreground mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">{feature.name}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Perfect For</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 columns-2">
              {venueInfo.suitableFor.map((activity) => (
                <li key={activity} className="flex items-center">
                  <CheckSquare className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact?subject=Venue Rental Inquiry">Inquire About Renting</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

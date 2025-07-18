
import Image from 'next/image';
import { classesData, type ClassInfo } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, BookOpen, Download, Users, CalendarDays } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/lib/metadata';
import { BrochureDownloadDialog } from '@/components/kidsverse/brochure-download-dialog';

interface ClassDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const classInfo = classesData.find((c) => c.slug === params.slug);

  if (!classInfo) {
    return {
      title: 'Class Not Found',
      description: 'The requested class could not be found.',
    };
  }

  const siteUrl = siteConfig.url;
  const ogImageUrl = `${siteUrl}${classInfo.image}`;
  const title = `${classInfo.name} Class for Kids`;
  const description = `Join our ${classInfo.name} class at Bright Planet Hub! ${classInfo.description} Perfect for children aged ${classInfo.ageGroups}.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: description,
      url: `${siteUrl}/classes/${classInfo.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Promotional image for ${classInfo.name} class`,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/classes/${classInfo.slug}`,
    }
  };
}


export async function generateStaticParams() {
  return classesData.map((classInfo) => ({
    slug: classInfo.slug,
  }));
}

export default function ClassDetailsPage({ params }: ClassDetailsPageProps) {
  const classInfo = classesData.find((c) => c.slug === params.slug);

  if (!classInfo) {
    return <div className="text-center py-10">Class not found.</div>;
  }

  const { name, Icon, description, curriculum, ageGroups, image, dataAiHint, curriculumPdfPath } = classInfo;
  
  const siteUrl = siteConfig.url;
  const courseStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: classInfo.name,
      description: classInfo.description,
      provider: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteUrl,
      },
      image: `${siteUrl}${classInfo.image}`,
      courseCode: classInfo.id,
      educationalCredentialAwarded: "Certificate of Completion (upon request)",
      audience: {
        '@type': 'Audience',
        audienceType: 'Children',
        description: classInfo.ageGroups
      }
    };
    
  const whatsappNumber = "96566488777";
  const enrollMessage = `Hello! I would like to enroll in the ${name} class.`;
  const whatsappEnrollUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enrollMessage)}`;

  return (
    <div className="space-y-10">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
        />
      <section className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
        <Image 
          src={image} 
          alt={`Promotional image for the ${name} class`} 
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          style={{objectFit: 'cover'}}
          priority
          data-ai-hint={dataAiHint}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <Icon className="h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white">{name}</h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-2xl">{description}</p>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center text-primary">
                <BookOpen className="mr-2 h-6 w-6" /> Curriculum Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-foreground/90">
                {curriculum.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {curriculumPdfPath && (
                <div className="mt-6">
                  <BrochureDownloadDialog 
                    pdfPath={curriculumPdfPath} 
                    courseName={name}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center text-primary">
                <Users className="mr-2 h-5 w-5" /> Age Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{ageGroups}</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center text-primary">
                <CalendarDays className="mr-2 h-5 w-5" /> Schedule & Booking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 mb-4">Check our schedule page for available timings.</p>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                <a href={whatsappEnrollUrl} target="_blank" rel="noopener noreferrer">Enroll Now</a>
              </Button>
              <Button asChild variant="outline" className="w-full mt-3">
                 <Link href="/schedule">View Schedule</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

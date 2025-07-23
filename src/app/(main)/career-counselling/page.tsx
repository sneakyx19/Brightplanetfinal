
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, GraduationCap, Sparkles, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';

const pageTitle = 'Career Counselling for Higher Studies in Kuwait';
const pageDescription = 'Expert career counselling in Kuwait for students from Grade 8 onwards. We guide students on higher studies and education abroad in partnership with AARA Consultancy.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/career-counselling`,
  }
};

const services = [
    {
        Icon: GraduationCap,
        title: "Study Abroad Counseling",
        description: "Expert guidance for applications to universities worldwide."
    },
    {
        Icon: Briefcase,
        title: "Career Path Planning",
        description: "Personalized counselling to identify and pursue the right career."
    },
    {
        Icon: Sparkles,
        title: "Profile Building",
        description: "Strategies to build a strong, well-rounded student profile."
    },
    {
        Icon: CheckCircle,
        title: "Test Preparation",
        description: "Comprehensive support for standardized tests like SAT, IELTS, and more."
    },
]

export default function CareerCounsellingPage() {
  const serviceStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pageTitle,
    description: pageDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: 'Educational service',
    audience: {
      '@type': 'Audience',
      audienceType: 'Students',
      description: 'Grade 8 onwards',
    },
    isicV4: "8530" // Higher education
  };

  return (
    <div className="space-y-12">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }}
      />
      <section className="relative h-72 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary via-purple-500 to-secondary flex flex-col items-center justify-center text-center p-4">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <Briefcase className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white">Career Counselling</h1>
          <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-3xl">
            Guiding students from Grade 8 onwards towards a successful future.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold text-primary">Your Journey to a Bright Future Starts Here</h2>
          <p className="text-lg text-foreground/80">
            Choosing a career path is one of the most important decisions in a student's life. Our Career Counselling program is designed to provide clarity, direction, and support to students starting from Grade 8. We help them explore their interests, understand their strengths, and align them with the right academic and career opportunities.
          </p>
          <p className="text-muted-foreground">
            Whether you dream of studying at a top international university or are exploring diverse career fields, our expert counsellors are here to guide you every step of the way.
          </p>
        </div>
        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Who Is This For?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <p>Students from <span className="font-bold">Grade 8 onwards</span>.</p>
                </div>
                 <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <p>Students planning for <span className="font-bold">higher education domestically or abroad</span>.</p>
                </div>
                 <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <p>Parents seeking expert guidance for their child's academic future.</p>
                </div>
            </CardContent>
        </Card>
      </section>

      <section className="py-12 bg-accent/50 rounded-xl">
        <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
                <Image src="/images/Aara-logo.png" alt="AARA Consultancy Logo" width={150} height={150} className="w-auto h-20" />
            </div>
          <h2 className="font-headline text-3xl font-bold text-foreground">In Partnership with AARA Consultancy</h2>
          <p className="text-lg text-muted-foreground mt-2 mb-6 max-w-3xl mx-auto">
            We are proud to partner with AARA Education Consultancy, headquartered in Mumbai, India, to bring you world-class educational services.
          </p>
          <Card className="max-w-4xl mx-auto shadow-lg text-left">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">About AARA Consultancy</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-6 text-foreground/90">"Aara Education Consultancy provides 360° educational services, including study abroad counseling, career counseling, profile building, test prep, and more!"</p>
                <div className="grid sm:grid-cols-2 gap-6">
                    {services.map((service) => (
                         <div key={service.title} className="flex items-start">
                            <service.Icon className="h-8 w-8 text-primary mr-3 mt-1 shrink-0" />
                            <div>
                                <h4 className="font-semibold">{service.title}</h4>
                                <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="font-headline text-2xl font-bold">Ready to Plan Your Future?</h2>
        <p className="text-muted-foreground mt-2 mb-6">Contact us today to schedule a consultation with our expert counsellors.</p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/contact?subject=Career Counselling Inquiry">Book a Consultation</Link>
        </Button>
      </section>
    </div>
  );
}

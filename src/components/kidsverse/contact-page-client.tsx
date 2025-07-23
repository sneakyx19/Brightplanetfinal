
"use client";

import { useSearchParams } from 'next/navigation';
import { InquiryForm } from '@/components/kidsverse/inquiry-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Suspense } from 'react';

function ContactFormWrapper() {
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject') || '';
  return <InquiryForm defaultSubject={subject} />;
}

export function ContactPageClient() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Get In Touch</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have questions, want to book a class, or rent our venue, feel free to reach out.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Form</CardTitle>
            <CardDescription>Send us a message directly.</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactFormWrapper />
            </Suspense>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <a href="mailto:Hello@brightplanetkw.com" className="hover:text-primary">Hello@brightplanetkw.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <a href="tel:+96594007464" className="hover:text-primary">+965 9400 7464</a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <a href="tel:+96566488777" className="hover:text-primary">+965 6648 8777</a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary mt-1" />
                <div>
                  Bright Planet Hub<br />
                  Villa 8, Medinaty Tower<br />
                  Block 5, Salmiya, Kuwait
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground">Registered in Kuwait as Bright Planet</p>
                <p className="text-xs text-muted-foreground">Educational Consultancy</p>
                <p className="text-xs text-muted-foreground">Registration number 512060</p>
              </div>
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-md overflow-hidden">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.9224445330883!2d48.07727827618274!3d29.32912447528394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b9227653451%3A0xe1c71360011b09b8!2sBright%20Planet%20Hub!5e0!3m2!1sen!2sus!4v1719505436345!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={false} 
                    loading="lazy"
                    title="Bright Planet Hub Location on Google Maps"
                  ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

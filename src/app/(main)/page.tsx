
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ArrowRight, Sparkles, Users, Building, Brain, Briefcase, Mic, BookOpen, Quote, Star, ChevronLeft, ChevronRight, Palette, PartyPopper } from 'lucide-react';
import type { SVGProps } from 'react';
import type { LucideIcon } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Program {
  id: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  href: string;
  bgColorClass?: string;
  textColorClass?: string; 
  iconBgClass?: string;
  iconColorClass?: string;
  buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
  buttonTextColorClass?: string;
  buttonBorderColorClass?: string;
  buttonHoverBgClass?: string;
  titleColorClass?: string;
  descriptionColorClass?: string;
}

const programs: Program[] = [
  {
    id: 'public-speaking',
    Icon: Mic,
    title: 'Public Speaking',
    description: 'Build confidence and effective communication abilities.',
    href: '/classes/public-speaking',
    bgColorClass: 'bg-card',
    iconBgClass: 'bg-primary/10',
    iconColorClass: 'text-primary',
    buttonVariant: 'link',
    buttonTextColorClass: 'text-primary',
    titleColorClass: 'text-primary',
    descriptionColorClass: 'text-muted-foreground',
  },
  {
    id: 'career-counselling',
    Icon: Briefcase,
    title: 'Career Counselling',
    description: 'Guiding young minds towards a bright future with early insights.',
    href: '/career-counselling',
    bgColorClass: 'bg-card',
    iconBgClass: 'bg-primary/10',
    iconColorClass: 'text-primary',
    buttonVariant: 'link',
    buttonTextColorClass: 'text-primary',
    titleColorClass: 'text-primary',
    descriptionColorClass: 'text-muted-foreground',
  },
  {
    id: 'arts-and-crafts',
    Icon: Palette,
    title: 'Arts and Crafts',
    description: "Unlock your child's imagination and problem-solving skills.",
    href: '/classes/arts',
    bgColorClass: 'bg-card', 
    iconBgClass: 'bg-primary/10',
    iconColorClass: 'text-primary',
    buttonVariant: 'link',
    buttonTextColorClass: 'text-primary',
    titleColorClass: 'text-primary',
    descriptionColorClass: 'text-muted-foreground',
  },
];

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  stars: number;
  reviewed: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Fatima A.",
    title: "Parent of Omar (Age 7)",
    quote: "The Public Speaking class has done wonders for Omar! He's so much more confident. The teachers in Bright Planet Hub are fantastic.",
    stars: 5,
    reviewed: "Public Speaking Class"
  },
  {
    name: "Ahmed K.",
    title: "Parent of Layla (Age 5)",
    quote: "We celebrated Layla's birthday at Bright Planet Hub, and it was a dream. The venue is spacious, colorful, and perfectly equipped for children's parties. Highly recommend!",
    stars: 5,
    reviewed: "Venue Rental"
  },
  {
    name: "Noora S.",
    title: "Parent of Yousef (Age 9)",
    quote: "Yousef was struggling with math, but the Mental Math program here made it fun for him. His speed and accuracy have improved significantly. Thank you, Bright Planet Hub!",
    stars: 5,
    reviewed: "Mental Math Class"
  },
  {
    name: "Yousef H.",
    title: "Parent of Sara & Ali",
    quote: "Bright Planet Hub is more than just a learning center; it's a community. My children feel so happy and engaged in their Arts & Crafts sessions. The atmosphere is always so welcoming.",
    stars: 5,
    reviewed: "Arts & Crafts"
  },
  {
    name: "Mariam M.",
    title: "Parent of Ibrahim (Age 3)",
    quote: "The Play School Program is excellent. Ibrahim has learned so much through play, and his social skills have blossomed. The teachers are patient and caring.",
    stars: 4,
    reviewed: "Play School Program"
  }
];

// Simple SVG Icons for decoration
const PlanetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <circle cx="50" cy="50" r="35" />
    <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(-30 50 50)" stroke="currentColor" strokeWidth="5" fill="none" opacity="0.5"/>
    <circle cx="30" cy="30" r="5" fill="rgba(255,255,255,0.5)" />
  </svg>
);

const RocketIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M75 90 A30 30 0 0 0 75 70 L65 70 L65 50 L55 40 L45 40 L35 50 L35 70 L25 70 A30 30 0 0 0 25 90 Z" />
    <rect x="45" y="10" width="10" height="30" rx="5"/>
    {/* Flames */}
    <path d="M40 70 Q50 60 60 70" stroke="hsl(var(--secondary))" strokeWidth="5" fill="none"/>
    <circle cx="30" cy="80" r="7" fill="hsl(var(--secondary))" />
    <circle cx="70" cy="80" r="7" fill="hsl(var(--secondary))" />
  </svg>
);

const StarIconSvg = (props: SVGProps<SVGSVGElement>) => ( // Renamed to avoid conflict with Lucide Star
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <polygon points="50,5 61,35 95,35 67,57 78,87 50,65 22,87 33,57 5,35 39,35" />
  </svg>
);

const SquiggleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" {...props}>
    <path d="M10 50 Q 25 20, 40 50 T 70 50 T 90 50" />
  </svg>
);

const SparkleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
  </svg>
);

const AbstractShapeAIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <path d="M20 20 Q 50 0, 80 20 Q 100 50, 80 80 Q 50 100, 20 80 Q 0 50, 20 20 Z" />
  </svg>
);
const AbstractShapeBIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
    <rect x="10" y="10" width="30" height="80" rx="5" />
    <rect x="60" y="10" width="30" height="80" rx="5" />
  </svg>
);

export default function HomePage() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappNumber = "96566488777";
  const enrollMessage = "Hello! I saw the new registration announcement and would like to know more.";
  const whatsappEnrollUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enrollMessage)}`;

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenRegistrationPopup');
    if (!hasSeenPopup) {
      // Use a timeout to let the page settle before showing the popup
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        sessionStorage.setItem('hasSeenRegistrationPopup', 'true');
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  const nextTestimonial = useCallback(() => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const startAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    autoplayIntervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 7000); // Change slide every 7 seconds
  }, [nextTestimonial]);

  const stopAutoplay = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay]);

  const handleManualNavigation = (action: () => void) => {
    stopAutoplay();
    action();
    startAutoplay(); // Restart autoplay after manual interaction
  };
  
  const currentTestimonial = testimonialsData[currentTestimonialIndex];

  return (
    <div className="space-y-16 md:space-y-20 overflow-x-hidden">
      {/* Registration Pop-up Dialog */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md text-center rounded-lg">
          <DialogHeader className="p-4 sm:p-6">
            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
               <PartyPopper className="h-10 w-10 text-primary" />
            </div>
            <DialogTitle className="font-headline text-2xl md:text-3xl text-primary">New Registrations Have Started!</DialogTitle>
            <DialogDescription className="text-base text-foreground/80 pt-2">
              We are excited to announce that new registrations are now open for our popular classes and programs. Secure your child's spot today!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center p-4 sm:p-6 pt-0 sm:pt-4">
            <Button size="lg" asChild className="bg-green-500 hover:bg-green-600 text-white w-full shadow-lg">
                <a href={whatsappEnrollUrl} target="_blank" rel="noopener noreferrer">
                    Register on WhatsApp
                </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-background text-foreground">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl sm:text-5xl font-bold mb-6 text-primary leading-tight">
                Engaging Kids Classes for Brighter Futures in Kuwait
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                Let the child be the director, and the actor in his own play. We foster creativity and confidence in our Salmiya-based hub.
              </p>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl animate-pulse-bright rounded-xl px-8 py-3 group transition-transform hover:scale-105"><Link href="/classes">Get Started<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" /></Link></Button>
            </div>
            
            <div className="relative mt-8 md:mt-0 flex justify-center items-center">
              {/* This new container holds the collage and prevents it from overflowing */}
              <div className="relative w-[280px] h-[320px] md:w-[350px] md:h-[400px]">
                {/* Background image container */}
                <div className="absolute top-0 right-0 w-[150px] h-[200px] md:w-[180px] md:h-[240px] transition-transform hover:scale-105 z-10">
                    <Image
                        src="/images/homepage-2nd-img.png"
                        alt="A happy child at Bright Planet Hub"
                        fill
                        sizes="(min-width: 768px) 180px, 150px"
                        style={{objectFit: 'cover'}}
                        className="rounded-xl shadow-2xl"
                        data-ai-hint="happy child"
                    />
                     <div className="absolute -top-5 -right-5 w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-float z-20" style={{animationDelay: '0.5s'}}>
                        <Sparkles className="w-7 h-7 text-white" />
                    </div>
                </div>

                {/* Main image container */}
                <div className="absolute bottom-0 left-0 w-[180px] h-[280px] md:w-[220px] md:h-[340px] transition-transform hover:scale-105 z-20">
                    <Image
                        src="/images/public-speaking-image.png"
                        alt="Child confidently practicing public speaking"
                        fill
                        sizes="(min-width: 768px) 220px, 180px"
                        style={{objectFit: 'cover'}}
                        className="rounded-xl shadow-2xl"
                        data-ai-hint="child speaking"
                        priority
                    />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center shadow-lg animate-float z-20">
                        <BookOpen className="w-8 h-8 text-yellow-700" />
                    </div>
                </div>
              </div>
            </div>

          </div>
          {/* Stats Section */}
          <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl p-6 rounded-xl hover:shadow-2xl transition-shadow">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-4xl font-bold text-orange-500">7.5k+</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground">Fun & interactive students taking gifted courses.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl p-6 rounded-xl hover:shadow-2xl transition-shadow">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-4xl font-bold text-purple-500">50+</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground">Awesome fields, programs and resources for learning.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Decorative floating elements - these are positioned relative to the section, behind the z-10 container */}
        <PlanetIcon className="absolute top-10 left-5 w-16 h-16 text-orange-400 opacity-30 animate-float hidden sm:block" style={{ animationDelay: '0.2s' }} />
        <RocketIcon className="absolute top-1/2 right-5 w-20 h-20 text-pink-400 opacity-40 animate-float hidden md:block" style={{ animationDelay: '0.7s' }} />
        <StarIconSvg className="absolute bottom-10 left-1/4 w-12 h-12 text-yellow-400 opacity-30 animate-float hidden sm:block" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/3 w-8 h-8 bg-orange-500 rounded-full opacity-50 animate-float hidden md:block" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-20 right-1/4 w-10 h-10 bg-purple-500 rounded-full opacity-40 animate-float" style={{animationDelay: '0.4s'}}></div>
        <PlanetIcon className="absolute bottom-10 right-10 w-12 h-12 text-pink-300 opacity-20 animate-float hidden md:block" style={{ animationDelay: '1.5s' }} />
        <StarIconSvg className="absolute top-1/4 left-1/3 w-8 h-8 text-orange-300 opacity-30 animate-float" style={{ animationDelay: '1.8s' }} />
        <SquiggleIcon className="absolute top-1/3 left-10 w-24 h-24 text-yellow-500 opacity-20 animate-float hidden md:block" style={{ animationDelay: '0.3s' }} />
        <SparkleIcon className="absolute bottom-1/4 right-16 w-10 h-10 text-pink-400 opacity-30 animate-float hidden sm:block" style={{ animationDelay: '0.6s' }} />
        <AbstractShapeAIcon className="absolute top-3/4 left-1/2 w-14 h-14 text-orange-400 opacity-25 animate-float hidden sm:block" style={{ animationDelay: '0.9s' }} />
        <AbstractShapeBIcon className="absolute top-10 right-1/2 w-12 h-12 text-purple-400 opacity-20 animate-float hidden md:block" style={{ animationDelay: '1.1s' }} />
        <StarIconSvg className="absolute top-5 left-1/2 w-6 h-6 text-pink-300 opacity-40 animate-float" style={{ animationDelay: '0.1s' }}/>
        <div className="absolute bottom-5 right-1/4 w-5 h-5 bg-yellow-500 rounded-full opacity-30 animate-float" style={{animationDelay: '1.6s'}}></div>
        <PlanetIcon className="absolute top-2/3 left-1/4 w-10 h-10 text-purple-300 opacity-25 animate-float hidden md:block" style={{animationDelay: '2s'}}/>
        <RocketIcon className="absolute bottom-1/3 right-1/3 w-14 h-14 text-orange-500 opacity-35 animate-float hidden sm:block" style={{animationDelay: '2.2s'}}/>
      </section>

      {/* Programs Section */}
      <section className="relative py-12 md:py-16 bg-accent text-accent-foreground rounded-xl transition-all duration-500 ease-in-out overflow-hidden">
        <Image
          src="/images/programs-background-img.png"
          alt="Creative abstract pattern for program background"
          fill
          sizes="100vw"
          style={{objectFit: 'cover'}}
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint="abstract pattern"
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-center mb-4 text-foreground">
            Programs
          </h2>
          <p className="text-center text-lg text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Our programs are designed to develop children's creative and critical thinking skills.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card
                key={program.id}
                className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col rounded-xl transform hover:-translate-y-2 ${program.bgColorClass} text-card-foreground`}
              >
                <CardHeader className="items-center text-center p-6">
                  <div className={`p-4 rounded-full mb-4 ${program.iconBgClass}`}>
                    <program.Icon className={`h-10 w-10 ${program.iconColorClass}`} />
                  </div>
                  <CardTitle className={`font-headline text-2xl ${program.titleColorClass || 'text-primary'}`}>
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-6 flex-grow">
                  <p className={`${program.descriptionColorClass || 'text-muted-foreground'} mb-6`}>
                    {program.description}
                  </p>
                  <Button asChild variant={program.buttonVariant} className={`${program.buttonTextColorClass} ${program.buttonBorderColorClass || ''} ${program.buttonHoverBgClass || ''} group`}><Link href={program.href}>Learn More<ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline" className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground hover:text-accent shadow-md transition-transform hover:scale-105 rounded-lg"><Link href="/classes">Explore All Programs</Link></Button>
          </div>
        </div>
        {/* Added floating elements for Programs section */}
        <StarIconSvg className="absolute -top-10 -left-10 w-12 h-12 text-primary opacity-20 animate-float" style={{ animationDelay: '0.1s' }} />
        <PlanetIcon className="absolute -bottom-8 -right-8 w-16 h-16 text-secondary opacity-25 animate-float" style={{ animationDelay: '0.5s' }} />
        <SquiggleIcon className="absolute top-1/4 -right-12 w-20 h-20 text-primary opacity-15 animate-float" style={{ animationDelay: '0.8s' }}/>
      </section>

      {/* Our Vision Section */}
      <section className="relative py-12 md:py-16 bg-background text-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-6">
            Our Vision
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground text-left md:text-center">
            <p>
              To create a world where every child discovers their true potential early, navigates life with clarity, and grows into a confident, purpose-driven individual ready to thrive beyond the classroom.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <StarIconSvg className="absolute top-10 right-5 md:right-10 w-10 h-10 md:w-12 md:h-12 text-secondary opacity-20 animate-float hidden sm:block" style={{ animationDelay: '0.2s' }} />
        <PlanetIcon className="absolute bottom-5 left-5 md:bottom-10 md:left-10 w-12 h-12 md:w-16 md:h-16 text-primary opacity-25 animate-float hidden sm:block" style={{ animationDelay: '0.6s' }} />
        <SparkleIcon className="absolute top-1/2 left-1/4 w-8 h-8 md:w-10 md:h-10 text-yellow-400 opacity-30 animate-float hidden sm:block" style={{ animationDelay: '0.9s' }}/>
         <RocketIcon className="absolute bottom-1/4 right-1/4 w-10 h-10 text-orange-400 opacity-20 animate-float hidden sm:block" style={{animationDelay: '1.2s'}} />
      </section>
      
      {/* Our Mission Section */}
      <section className="relative py-12 md:py-16 bg-accent/50 text-foreground pt-0 md:pt-0">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-6">
            Our Mission
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground text-left md:text-center">
            <p>
              Our mission is to bridge the gap between traditional education and real-life readiness by identifying children's unique talents from the age of 7, nurturing their subconscious growth, and equipping them with clarity, confidence, and faith to shape their own future.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <StarIconSvg className="absolute top-10 left-5 md:left-10 w-10 h-10 md:w-12 md:h-12 text-secondary opacity-20 animate-float hidden sm:block" style={{ animationDelay: '0.3s' }} />
        <PlanetIcon className="absolute bottom-5 right-5 md:bottom-10 md:right-10 w-12 h-12 md:w-16 md:h-16 text-primary opacity-25 animate-float hidden sm:block" style={{ animationDelay: '0.7s' }} />
      </section>

      {/* Discover More Section */}
      <section className="relative py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
           <h2 className="font-headline text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Discover More
          </h2>
          <p className="text-muted-foreground mb-8">
            Explore other services and features we offer.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="font-headline text-xl">AI Activity Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Get personalized activity plans for your child.</p>
                <Button asChild variant="secondary" className="rounded-lg"><Link href="/ai-activity-plan">Try It Now</Link></Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="font-headline text-xl">Workshops & Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Join our free workshops and special events.</p>
                <Button asChild variant="secondary" className="rounded-lg"><Link href="/workshops">See Events</Link></Button>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader>
                <Building className="h-12 w-12 text-primary mx-auto mb-3" />
                <CardTitle className="font-headline text-xl">Venue Rental</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Host your next party or event in our venue.</p>
                <Button asChild variant="secondary" className="rounded-lg"><Link href="/venue">Explore Venue</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
         {/* Added floating elements for Discover More section */}
        <SparkleIcon className="absolute bottom-5 -left-5 w-10 h-10 text-orange-400 opacity-25 animate-float hidden sm:block" style={{ animationDelay: '0.2s' }}/>
        <AbstractShapeAIcon className="absolute top-10 -right-10 w-14 h-14 text-pink-300 opacity-20 animate-float hidden sm:block" style={{ animationDelay: '0.6s' }}/>
      </section>

      {/* Testimonials Section - Slideshow */}
      <section className="relative py-12 md:py-16 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Hear From Our Happy Parents
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            We're proud of the positive experiences our families in Kuwait have at Bright Planet Hub.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <div className="overflow-hidden">
              <Card className="shadow-lg text-left bg-card rounded-xl min-h-[320px] sm:min-h-[280px] flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start mb-2">
                    <Quote className="h-10 w-10 text-primary mr-3 shrink-0 -mt-1" />
                    <div>
                      <CardTitle className="font-headline text-xl text-primary">{currentTestimonial.name}</CardTitle>
                      <CardDescription>{currentTestimonial.title}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/90 italic mb-4 text-base">
                    "{currentTestimonial.quote}"
                  </p>
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < currentTestimonial.stars ? 'fill-current' : 'stroke-current text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">- Reviewed: {currentTestimonial.reviewed}</p>
                </CardContent>
              </Card>
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 sm:-left-12 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background"
              onClick={() => handleManualNavigation(prevTestimonial)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 rounded-full bg-background/70 hover:bg-background"
              onClick={() => handleManualNavigation(nextTestimonial)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
           <div className="flex justify-center mt-6 space-x-2">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    stopAutoplay();
                    setCurrentTestimonialIndex(index);
                    startAutoplay();
                  }}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    currentTestimonialIndex === index ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
        </div>
        {/* Decorative elements for Testimonials section */}
        <PlanetIcon className="absolute top-10 left-10 w-12 h-12 text-purple-300 opacity-20 animate-float hidden sm:block" style={{ animationDelay: '0.3s' }} />
        <StarIconSvg className="absolute bottom-5 right-1/4 w-10 h-10 text-orange-300 opacity-25 animate-float hidden sm:block" style={{ animationDelay: '0.7s' }} />
        <RocketIcon className="absolute top-1/3 right-5 w-16 h-16 text-pink-400 opacity-30 animate-float hidden md:block" style={{ animationDelay: '1s' }}/>
      </section>

    </div>
  );
}


"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/classes', label: 'Classes' },
  { href: '/career-counselling', label: 'Career Counselling' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/venue', label: 'Venue' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/ai-activity-plan', label: 'AI Activity Plan' },
  { href: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const NavLinksContent = ({isMobile = false}: {isMobile?: boolean}) => (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className={cn(
            "justify-start text-base md:text-sm",
            pathname === link.href ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50',
            isMobile ? 'w-full py-3 text-left' : ''
          )}
          onClick={isMobile ? handleLinkClick : undefined}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 md:h-28 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-primary">
          <Image src="/images/Logo-BP.png" alt="Bright Planet Hub Logo" width={100} height={100} className="h-20 md:h-24 w-auto" />
          <span className="font-bold font-headline text-xl sm:inline-block">Bright Planet Hub</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
          <NavLinksContent />
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] pt-10">
               <SheetHeader className="sr-only">
                  <SheetTitle>Main Menu</SheetTitle>
                </SheetHeader>
              <nav className="flex flex-col space-y-2">
                <NavLinksContent isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

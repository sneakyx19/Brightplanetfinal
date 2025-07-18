
import { Facebook, Instagram, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t bg-background/80">
      <div className="container mx-auto py-8 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-headline text-lg font-semibold mb-3 text-primary">Bright Planet Hub</h5>
            <p className="text-sm text-muted-foreground">
              Nurturing creativity and joy in every child.
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
                <p>Registered in Kuwait as Bright Planet</p>
                <p>Educational Consultancy</p>
                <p>Registration number 512060</p>
            </div>
          </div>
          <div>
            <h5 className="font-headline text-lg font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/classes" className="hover:text-primary transition-colors">Classes</Link></li>
              <li><Link href="/career-counselling" className="hover:text-primary transition-colors">Career Counselling</Link></li>
              <li><Link href="/workshops" className="hover:text-primary transition-colors">Workshops</Link></li>
              <li><Link href="/venue" className="hover:text-primary transition-colors">Venue Rental</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-headline text-lg font-semibold mb-3">Connect With Us</h5>
            <div className="flex space-x-4 mb-4">
              <Link href="https://www.facebook.com/profile.php?id=61578084914248" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
              <Link href="https://www.instagram.com/bright_planetkw?igsh=MTM1OXEwb2Nydzlvag%3D%3D&utm_source=qr" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
            </div>
             <div className="space-y-2 text-sm text-muted-foreground">
               <p className="flex items-center">
                 <Phone size={16} className="mr-2 text-primary/80" />
                 <a href="tel:+96594007464" className="hover:text-primary transition-colors">+965 9400 7464</a>
               </p>
                <p className="flex items-center">
                 <Phone size={16} className="mr-2 text-primary/80" />
                 <a href="tel:+96566488777" className="hover:text-primary transition-colors">+965 6648 8777</a>
               </p>
             </div>
            <p className="text-sm text-muted-foreground mt-4">
              Salmiya, Block 5, Kuwait
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Bright Planet Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

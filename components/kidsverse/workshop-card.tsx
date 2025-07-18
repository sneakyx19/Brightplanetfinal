import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { WorkshopInfo } from '@/lib/data';
import { CalendarDays, Clock, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';

interface WorkshopCardProps {
  workshop: WorkshopInfo;
  onSignup: (workshop: WorkshopInfo) => void;
}

export function WorkshopCard({ workshop, onSignup }: WorkshopCardProps) {
  const { title, Icon, date, time, description, image, dataAiHint, isFree } = workshop;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <div className="relative h-52 w-full">
        <Image 
          src={image} 
          alt={title} 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{objectFit: 'cover'}}
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={dataAiHint}
        />
        {isFree && (
            <Badge variant="secondary" className="absolute top-2 right-2 z-10 bg-green-500 text-white border-green-600">
                FREE
            </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="font-headline flex items-center text-xl">
          <Icon className="mr-2 h-6 w-6 text-primary" />
          {title}
        </CardTitle>
        <div className="text-sm text-muted-foreground space-y-1">
          <p className="flex items-center"><CalendarDays className="mr-2 h-4 w-4" /> {date}</p>
          <p className="flex items-center"><Clock className="mr-2 h-4 w-4" /> {time}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardDescription className="mb-4 flex-grow min-h-[4rem]">{description}</CardDescription>
        <Button 
          onClick={() => onSignup(workshop)}
          className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Sign Up Now
        </Button>
      </CardContent>
    </Card>
  );
}

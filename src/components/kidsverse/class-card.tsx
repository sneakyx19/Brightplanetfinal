
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { ClassInfo } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface ClassCardProps {
  classInfo: ClassInfo;
}

export function ClassCard({ classInfo }: ClassCardProps) {
  const { slug, name, Icon, description, image, dataAiHint, isUpcoming } = classInfo;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
      <div className="relative w-full aspect-video">
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{objectFit: 'cover'}}
          data-ai-hint={dataAiHint}
          className="transition-transform duration-300 group-hover:scale-105" 
        />
        {isUpcoming && (
          <Badge variant="secondary" className="absolute top-2 right-2 z-10">
            Coming Soon
          </Badge>
        )}
      </div>
      <CardHeader>
        <CardTitle className="font-headline flex items-center text-2xl text-primary">
          <Icon className="mr-3 h-7 w-7" />
          {name}
        </CardTitle>
        <CardDescription className="min-h-[4.5rem] text-ellipsis overflow-hidden line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Button asChild variant="default" className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/classes/${slug}`}>
            Learn More <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

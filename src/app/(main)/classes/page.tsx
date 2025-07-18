import { ClassCard } from '@/components/kidsverse/class-card';
import { classesData } from '@/lib/data';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

const pageTitle = 'Our Classes for Kids';
const pageDescription = 'Explore all our engaging classes for kids at Bright Planet Hub, from Public Speaking and Arts to Mental Math and Yoga. Find the perfect activity to spark your child\'s curiosity and build new skills.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
   openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/classes`,
  }
};

export default function ClassesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Our Classes</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Explore a variety of engaging classes designed to spark curiosity and develop new skills in a fun, supportive environment.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classesData.map((classInfo) => (
          <ClassCard key={classInfo.id} classInfo={classInfo} />
        ))}
      </section>
    </div>
  );
}

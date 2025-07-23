import { AiActivityForm } from '@/components/kidsverse/ai-activity-form';
import { siteConfig } from '@/lib/metadata';
import type { Metadata } from 'next';

const pageTitle = 'Free AI Activity Plan Generator for Kids';
const pageDescription = 'Generate custom, fun, and educational activity plans for your child based on their age and interests with our free AI tool. Perfect for parents and educators in Kuwait.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/ai-activity-plan`,
  }
};

export default function AiActivityPlanPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">AI Activity Plan Generator</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Let our AI help you create fun and engaging activity plans tailored to your child's age and preferences.
        </p>
      </section>

      <section>
        <AiActivityForm />
      </section>
    </div>
  );
}

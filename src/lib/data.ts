
import type { LucideIcon } from 'lucide-react';
import { Mic, Palette, Brain, ToyBrick, Waves, PersonStanding, CalendarDays, MapPin, Users, Clock, DollarSign, BookOpen, BarChart, Target, Briefcase } from 'lucide-react';
import { IconGymnastics, IconKarate } from '@/components/kidsverse/icons';

export interface ClassInfo {
  id: string;
  slug: string;
  name: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  curriculum: string[];
  ageGroups: string;
  instructor?: { name: string; bio: string; image: string };
  image: string;
  dataAiHint: string;
  isUpcoming?: boolean;
  curriculumPdfPath?: string; // New field for PDF path
}

export const classesData: ClassInfo[] = [
  {
    id: 'public-speaking',
    slug: 'public-speaking',
    name: 'Public Speaking',
    Icon: Mic,
    description: 'Build confidence and communication skills with our engaging public speaking classes.',
    curriculum: [
      'Building Confidence & Overcoming Stage Fright',
      'Voice Modulation & Clear Articulation Techniques',
      'Mastering Body Language & Powerful Gestures',
      'Structuring Engaging Speeches & Compelling Stories',
      'Interactive Practice Sessions & Constructive Feedback',
      'Fun activities to make learning enjoyable',
      'Flexible Learning: Available in both Online and In-Person class formats'
    ],
    ageGroups: '7-12 years',
    image: '/images/Public-Speaking-card.png',
    dataAiHint: 'public speaking',
    curriculumPdfPath: '/Public-Speaking-Course.pdf', // Path to the PDF
  },
  {
    id: 'arts',
    slug: 'arts',
    name: 'Arts & Crafts',
    Icon: Palette,
    description: 'Unleash creativity with painting, drawing, sculpting, and various craft projects.',
    curriculum: ['Color theory', 'Drawing techniques', 'Clay modeling', 'Recycled art'],
    ageGroups: '5-10 years',
    instructor: { name: 'Mr. Arthur', bio: 'An passionate artist and educator.', image: '/images/instructor-arthur.png' },
    image: '/images/Arts-and-carft.png',
    dataAiHint: 'child painting',
  },
  {
    id: 'mental-math',
    slug: 'mental-math',
    name: 'Mental Math',
    Icon: Brain,
    description: 'Sharpen mathematical skills and speed with fun mental arithmetic techniques.',
    curriculum: ['Abacus basics', 'Vedic math tricks', 'Speed calculations', 'Logic puzzles'],
    ageGroups: '6-11 years',
    image: '/images/mental-maths.png',
    dataAiHint: 'child math'
  },
  {
    id: 'play-school',
    slug: 'play-school',
    name: 'Play School Program',
    Icon: ToyBrick,
    description: 'A nurturing environment for early learners, focusing on play-based education.',
    curriculum: ['Early literacy & numeracy', 'Social skills development', 'Motor skills activities', 'Creative play'],
    ageGroups: '2-4 years',
    instructor: { name: 'Ms. Daisy & Team', bio: 'Experienced early childhood educators.', image: '/images/instructor-daisy.png' },
    image: '/images/Play-school-image-classes.png',
    dataAiHint: 'children playing'
  },
  {
    id: 'swimming',
    slug: 'swimming',
    name: 'Swimming Lessons',
    Icon: Waves,
    description: 'Learn to swim with certified instructors in a safe and fun pool environment.',
    curriculum: ['Water safety', 'Basic strokes (freestyle, backstroke)', 'Breathing techniques', 'Confidence building'],
    ageGroups: '4+ years (grouped by skill)',
    instructor: { name: 'Coach Finn', bio: 'Certified lifeguard and swim coach.', image: '/images/instructor-finn.png' },
    image: '/images/Swimming-image.png',
    dataAiHint: 'child swimming',
  },
  {
    id: 'yoga',
    slug: 'yoga',
    name: 'Yoga & Mindfulness',
    Icon: Waves, // Using Waves icon from lucide-react, as custom icons can be tricky.
    description: 'Introduce children to yoga through playful poses, mindfulness, and relaxation.',
    curriculum: ['Animal poses', 'Breathing exercises', 'Story-based yoga', 'Mindfulness games'],
    ageGroups: '4-9 years',
    instructor: { name: 'Ms. Shanti', bio: 'Certified kids yoga instructor.', image: '/images/instructor-shanti.png' },
    image: '/images/Yoga-image.png',
    dataAiHint: 'child yoga',
  },
];

export interface WorkshopInfo {
  id: string;
  title: string;
  Icon: LucideIcon;
  date: string;
  time: string;
  description: string;
  image: string;
  dataAiHint: string;
  isFree?: boolean;
}

export const workshopsData: WorkshopInfo[] = [
  {
    id: 'ws1',
    title: 'Public Speaking Workshop (Free!)',
    Icon: Mic,
    date: 'Date: To Be Announced',
    time: 'Time: To Be Announced',
    description: 'Boost confidence and learn essential communication skills in this introductory public speaking workshop.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxXb3Jrc2hvcHN8ZW58MHx8fHwxNzUyNzE2MzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'public speaking',
    isFree: true,
  },
  {
    id: 'ws2',
    title: 'Career Counselling Workshop',
    Icon: Briefcase,
    date: 'Date: To Be Announced',
    time: 'Time: To Be Announced',
    description: 'An introductory workshop for students (Grade 8+) and parents to understand the importance of early career planning and study abroad options.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxncmFkdWF0aW9ufGVufDB8fHx8MTc1MjcxNjI1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    dataAiHint: 'career counselling student',
    isFree: false,
  },
];

export interface VenueFeature {
  name: string;
  Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
}

export const venueInfo = {
  name: 'Bright Planet Hub Activity Center',
  description: "Our versatile venue is designed to host a wide range of children's activities, parties, and workshops. With ample space, modern amenities, and a child-friendly environment, it's the perfect place for learning and fun. We also offer professional office workspace rentals.",
  images: [
    { src: '/images/Venue-Image.png', alt: 'Bright Planet Hub venue space with tables and chairs', dataAiHint: 'venue interior' },
    { src: '/images/Classroom-Image.png', alt: 'Classroom setup at Bright Planet Hub', dataAiHint: 'classroom' },
    { src: '/images/Venue-outer.png', alt: 'Outer view of the Bright Planet Hub venue', dataAiHint: 'venue exterior' },
  ],
  features: [
    { name: 'Spacious Halls', Icon: Users, description: 'Large, adaptable halls suitable for group activities, performances, and parties.' },
    { name: 'Activity-Specific Zones', Icon: Target, description: 'Dedicated areas perfect for gymnastics, karate, dance, and other specialized classes.' },
    { name: 'Office Workspace Rental', Icon: Briefcase, description: 'Flexible office spaces available for rent, suitable for professionals and teams.' },
    { name: 'Safe & Clean', Icon: MapPin, description: 'Maintained to the highest standards of safety and cleanliness.' },
    { name: 'Modern Amenities', Icon: Clock, description: 'Equipped with AV systems, comfortable seating, and accessible facilities.' },
  ],
  suitableFor: ['Gymnastics', 'Karate', 'Dance', 'Birthday Parties', 'Workshops', 'Playgroups', 'Office Space'],
};

export interface ScheduleEvent {
  id: string;
  title: string;
  type: 'class' | 'workshop' | 'venue booking';
  startTime: string; // e.g., "2024-08-05T10:00:00"
  endTime: string;   // e.g., "2024-08-05T11:00:00"
  description?: string;
}

// Mock schedule data - In a real app, this would come from a DB
export const scheduleData: ScheduleEvent[] = [
  // Assume current month for demo purposes.
  // For dynamic date generation:
  // const today = new Date();
  // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  // const getDate = (day: number, hour: number, minute: number) => new Date(today.getFullYear(), today.getMonth(), day, hour, minute).toISOString();

  // Using static dates for simplicity here
  { id: 'evt1', title: 'Public Speaking (7-9 yrs)', type: 'class', startTime: '2024-08-05T10:00:00', endTime: '2024-08-05T11:00:00' },
  { id: 'evt2', title: 'Arts & Crafts (5-7 yrs)', type: 'class', startTime: '2024-08-05T14:00:00', endTime: '2024-08-05T15:00:00' },
  { id: 'evt3', title: 'Mental Math (Beginners)', type: 'class', startTime: '2024-08-06T11:00:00', endTime: '2024-08-06T12:00:00' },
  { id: 'evt4', title: 'Public Speaking Workshop', type: 'workshop', startTime: '2024-08-10T10:00:00', endTime: '2024-08-10T12:00:00', description: 'Free workshop, sign up now!' },
  { id: 'evt5', title: 'Play School (Morning Batch)', type: 'class', startTime: '2024-08-12T09:00:00', endTime: '2024-08-12T12:00:00' },
  { id: 'evt6', title: 'Swimming (Advanced)', type: 'class', startTime: '2024-08-13T16:00:00', endTime: '2024-08-13T17:00:00' },
  { id: 'evt7', title: 'Kids Yoga', type: 'class', startTime: '2024-08-14T09:30:00', endTime: '2024-08-14T10:30:00' },
  { id: 'evt8', title: 'Arts & Crafts Adventure', type: 'workshop', startTime: '2024-08-18T14:00:00', endTime: '2024-08-18T15:30:00' },
  { id: 'evt9', title: 'Venue Rental: Birthday Party', type: 'venue booking', startTime: '2024-08-24T13:00:00', endTime: '2024-08-24T16:00:00' },
  // Added Public Speaking Classes for August 2024
  // Mondays 3 PM - 4 PM
  { id: 'ps-2024-08-05-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-05T15:00:00', endTime: '2024-08-05T16:00:00' },
  { id: 'ps-2024-08-12-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-12T15:00:00', endTime: '2024-08-12T16:00:00' },
  { id: 'ps-2024-08-19-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-19T15:00:00', endTime: '2024-08-19T16:00:00' },
  { id: 'ps-2024-08-26-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-26T15:00:00', endTime: '2024-08-26T16:00:00' },
  // Wednesdays 3 PM - 4 PM
  { id: 'ps-2024-08-07-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-07T15:00:00', endTime: '2024-08-07T16:00:00' },
  { id: 'ps-2024-08-14-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-14T15:00:00', endTime: '2024-08-14T16:00:00' },
  { id: 'ps-2024-08-21-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-21T15:00:00', endTime: '2024-08-21T16:00:00' },
  { id: 'ps-2024-08-28-1500', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-28T15:00:00', endTime: '2024-08-28T16:00:00' },
  // Fridays 6 PM - 7 PM
  { id: 'ps-2024-08-02-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-02T18:00:00', endTime: '2024-08-02T19:00:00' },
  { id: 'ps-2024-08-09-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-09T18:00:00', endTime: '2024-08-09T19:00:00' },
  { id: 'ps-2024-08-16-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-16T18:00:00', endTime: '2024-08-16T19:00:00' },
  { id: 'ps-2024-08-23-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-23T18:00:00', endTime: '2024-08-23T19:00:00' },
  { id: 'ps-2024-08-30-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-30T18:00:00', endTime: '2024-08-30T19:00:00' },
  // Saturdays 6 PM - 7 PM
  { id: 'ps-2024-08-03-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-03T18:00:00', endTime: '2024-08-03T19:00:00' },
  { id: 'ps-2024-08-10-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-10T18:00:00', endTime: '2024-08-10T19:00:00' },
  { id: 'ps-2024-08-17-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-17T18:00:00', endTime: '2024-08-17T19:00:00' },
  { id: 'ps-2024-08-24-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-24T18:00:00', endTime: '2024-08-24T19:00:00' },
  { id: 'ps-2024-08-31-1800', title: 'Public Speaking Class', type: 'class', startTime: '2024-08-31T18:00:00', endTime: '2024-08-31T19:00:00' },
];

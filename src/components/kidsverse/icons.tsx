import type { SVGProps } from 'react';

export function IconLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 50 50" fill="currentColor" {...props}>
      <circle cx="25" cy="25" r="20" />
    </svg>
  );
}

// NOTE: Custom icons can be complex. Prefer using icons from the lucide-react library where possible for consistency and performance.
// The IconYogaLotus has been replaced with the `Waves` icon from lucide-react in data.ts.

export function IconGymnastics(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="6" r="2"/>
      <path d="M12 8v4l-4 4"/>
      <path d="M12 12l4 4"/>
      <path d="M10 20h4"/>
      <path d="M12 16l-2-4 -4 2"/>
      <path d="M12 16l2-4 4 2"/>
    </svg>
  );
}

export function IconKarate(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v5l-3 3"/>
      <path d="M10 15l-3 4h10l-3-4"/>
      <path d="M16 12h3"/>
    </svg>
  );
}

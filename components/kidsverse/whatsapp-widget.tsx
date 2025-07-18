
"use client";

import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppWidget() {
  const phoneNumber = "96566488777"; // Replace with your actual WhatsApp number
  const message = "Hello! I would like to inquire about one of your Courses and Services."; // Optional pre-filled message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <div className="fixed bottom-6 right-6 z-50 h-16 w-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform">
        <FaWhatsapp className="text-white text-4xl" />
      </div>
    </Link>
  );
}

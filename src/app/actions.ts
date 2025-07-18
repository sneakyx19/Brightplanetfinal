
"use server";

import { z } from "zod";
import { generateActivityPlan as genkitGenerateActivityPlan } from "@/ai/flows/generate-activity-plan";
import type { GenerateActivityPlanInput, GenerateActivityPlanOutput } from "@/ai/flows/generate-activity-plan";
import { Resend } from 'resend';
import { BrochureRequestEmail } from '@/components/emails/brochure-request-email';
import { InquiryNotificationEmail } from '@/components/emails/inquiry-notification-email';
import { WorkshopSignupEmail } from "@/components/emails/workshop-signup-email";
import React from 'react';

// Inquiry Form
const inquiryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(1, "Please select a subject."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type InquiryFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitInquiry(
  prevState: InquiryFormState,
  data: FormData
): Promise<InquiryFormState> {
  const formData = Object.fromEntries(data);
  const parsed = inquiryFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const { name, email, subject, message } = parsed.data;
  const toEmail = process.env.NOTIFICATION_EMAIL_TO;
  const fromEmail = process.env.NOTIFICATION_EMAIL_FROM;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY environment variable is not set.");
    // This is a server configuration issue, so we can return a generic error.
    // We can also log this request to a database or file as a fallback.
    console.log("Fallback: Inquiry received:", { name, email, subject, message });
    return {
      message: "Thank you for your inquiry! We have received it and will be in touch shortly.",
      success: true,
    };
  }
  
  if (!toEmail || !fromEmail) {
    console.error("Email environment variables (TO and FROM) are not set.");
    return {
      message: "Server configuration error. Could not send inquiry.",
      success: false,
    };
  }

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: `Bright Planet Hub Contact Form <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `New Inquiry: ${subject}`,
      react: InquiryNotificationEmail({ name, email, subject, message }) as React.ReactElement,
    });
  } catch (exception) {
    console.error("Email sending exception:", exception);
    return {
      message: "An unexpected error occurred. Please try again later.",
      success: false,
    };
  }

  return {
    message: "Thank you for your inquiry! We will get back to you soon.",
    success: true,
  };
}


// Workshop Signup Form
const workshopSignupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  mobileNumber: z.string().min(8, "Please enter a valid mobile number."),
  workshopId: z.string().min(1, "Workshop ID is missing."),
  workshopTitle: z.string().min(1, "Workshop title is missing."),
});

export type WorkshopSignupState = {
  message: string;
  success: boolean;
};

export async function submitWorkshopSignup(
  prevState: WorkshopSignupState,
  data: FormData
): Promise<WorkshopSignupState> {
  const formData = Object.fromEntries(data);
  const parsed = workshopSignupSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid signup data. " + parsed.error.issues.map((issue) => issue.message).join(', '),
      success: false,
    };
  }

  const { name, email, mobileNumber, workshopTitle } = parsed.data;
  const toEmail = process.env.NOTIFICATION_EMAIL_TO;
  const fromEmail = process.env.NOTIFICATION_EMAIL_FROM;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY environment variable is not set.");
    // This is a server configuration issue, so we can return a generic error.
    // We can also log this request to a database or file as a fallback.
    console.log("Fallback: Workshop signup submitted:", parsed.data);
    return {
      message: `Successfully signed up for ${workshopTitle}! We'll send a confirmation to ${email}.`,
      success: true,
    };
  }
  
  if (!toEmail || !fromEmail) {
    console.error("Email environment variables (TO and FROM) are not set.");
    return {
      message: "Server configuration error. Could not send signup notification.",
      success: false,
    };
  }

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: `Bright Planet Hub <${fromEmail}>`,
      to: [toEmail],
      reply_to: email,
      subject: `New Workshop Signup: ${workshopTitle}`,
      react: WorkshopSignupEmail({ name, email, mobileNumber, workshopTitle }) as React.ReactElement,
    });
  } catch (exception) {
    console.error("Workshop signup email sending exception:", exception);
    // Don't fail the user's request if the email fails.
  }


  return {
    message: `Successfully signed up for ${parsed.data.workshopTitle}! We'll send a confirmation to ${parsed.data.email}.`,
    success: true,
  };
}


// AI Activity Plan Generator
const activityPlanSchema = z.object({
  childAge: z.coerce.number().min(1, "Age must be at least 1").max(18, "Age must be 18 or less."),
  preferences: z.string().min(3, "Preferences must be at least 3 characters long."),
});

export type ActivityPlanState = {
  message?: string;
  plan?: GenerateActivityPlanOutput;
  success: boolean;
  errors?: {
    childAge?: string[];
    preferences?: string[];
    general?: string;
  };
};

export async function generateActivityPlanAction(
  prevState: ActivityPlanState,
  data: FormData
): Promise<ActivityPlanState> {
  const formData = Object.fromEntries(data);
  const parsed = activityPlanSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Invalid input."
    };
  }

  try {
    const input: Omit<GenerateActivityPlanInput, 'availableCourses'> = {
      childAge: parsed.data.childAge,
      preferences: parsed.data.preferences,
    };
    const result = await genkitGenerateActivityPlan(input);
    return {
      plan: result,
      success: true,
      message: "Activity plan generated successfully!"
    };
  } catch (error) {
    console.error("Error generating activity plan:", error);
    return {
      success: false,
      message: "Failed to generate activity plan. Please try again.",
      errors: { general: (error instanceof Error ? error.message : "Unknown error") }
    };
  }
}

// Brochure Download Form
const brochureFormSchema = z.object({
  mobileNumber: z.string().min(8, "Please enter a valid mobile number."),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal('')),
  courseName: z.string(),
});

export type BrochureFormState = {
  message: string;
  success: boolean;
  issues?: string[];
};

export async function submitBrochureRequest(
  prevState: BrochureFormState,
  data: FormData
): Promise<BrochureFormState> {
  const formData = Object.fromEntries(data);
  const parsed = brochureFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const { mobileNumber, email, courseName } = parsed.data;
  const toEmail = process.env.NOTIFICATION_EMAIL_TO;
  const fromEmail = process.env.NOTIFICATION_EMAIL_FROM;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY environment variable is not set.");
    // This is a server configuration issue, so we can return a generic error.
    // We can also log this request to a database or file as a fallback.
    console.log("Fallback: Brochure Request received:", { mobileNumber, email, courseName });
    return {
      message: "Thank you for your request! We have received it and will be in touch shortly.",
      success: true,
    };
  }

  if (!toEmail || !fromEmail) {
    console.error("Email environment variables (TO and FROM) are not set.");
    return {
      message: "Server configuration error. Could not send request.",
      success: false,
    };
  }

  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: `Bright Planet Hub <${fromEmail}>`,
      to: [toEmail],
      subject: `New Brochure Request: ${courseName}`,
      react: BrochureRequestEmail({ mobileNumber, email, courseName }) as React.ReactElement,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        message: "Failed to send request. Please try again later.",
        success: false,
      };
    }
  } catch (exception) {
    console.error("Email sending exception:", exception);
    return {
      message: "An unexpected error occurred. Please try again later.",
      success: false,
    };
  }

  return {
    message: "Thank you! Your download will begin shortly.",
    success: true,
  };
}

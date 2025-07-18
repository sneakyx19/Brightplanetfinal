
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { submitInquiry, type InquiryFormState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useFormStatus } from "react-dom";

const inquiryFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

const initialState: InquiryFormState = {
  message: "",
  success: false,
};

interface InquiryFormProps {
  defaultSubject?: string;
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
         <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={pending}>
           {pending ? "Sending..." : "Send Message"}
        </Button>
    )
}

export function InquiryForm({ defaultSubject }: InquiryFormProps) {
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: defaultSubject || "",
      message: "",
    },
  });

   useEffect(() => {
    // This effect ensures defaultSubject from URL params is applied after the form initializes
    if (defaultSubject) {
      form.setValue('subject', defaultSubject, { shouldValidate: true });
    }
   }, [defaultSubject, form]);

   useEffect(() => {
    if (state.message && (state.success || (state.issues && state.issues.length > 0))) {
      toast({
        title: state.success ? "Message Sent!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        form.reset({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} key={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Class Booking">Class Booking</SelectItem>
                  <SelectItem value="Workshop Registration">Workshop Registration</SelectItem>
                  <SelectItem value="Venue Rental">Venue Rental</SelectItem>
                  <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isMounted ? <SubmitButton /> : <Button className="w-full" disabled>Loading...</Button>}
      </form>
    </Form>
  );
}

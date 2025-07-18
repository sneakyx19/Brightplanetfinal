
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
import { useActionState, useEffect } from "react";
import { submitWorkshopSignup, type WorkshopSignupState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { WorkshopInfo } from "@/lib/data";

const workshopSignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobileNumber: z.string().min(8, "Please enter a valid mobile number."),
  workshopId: z.string(),
  workshopTitle: z.string(),
});

type WorkshopSignupFormValues = z.infer<typeof workshopSignupSchema>;

interface WorkshopSignupFormProps {
  workshop: WorkshopInfo;
  onFormSubmitSuccess?: () => void;
}

const initialState: WorkshopSignupState = {
  message: "",
  success: false,
};

export function WorkshopSignupForm({ workshop, onFormSubmitSuccess }: WorkshopSignupFormProps) {
  const [state, formAction] = useActionState(submitWorkshopSignup, initialState);
  const { toast } = useToast();

  const form = useForm<WorkshopSignupFormValues>({
    resolver: zodResolver(workshopSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      mobileNumber: "",
      workshopId: workshop.id,
      workshopTitle: workshop.title,
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success && onFormSubmitSuccess) {
        form.reset();
        onFormSubmitSuccess();
      }
    }
  }, [state, toast, form, onFormSubmitSuccess]);


  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="workshopId" value={workshop.id} />
        <input type="hidden" name="workshopTitle" value={workshop.title} />
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
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="e.g. 91234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Signing Up..." : "Sign Up for Workshop"}
        </Button>
      </form>
    </Form>
  );
}

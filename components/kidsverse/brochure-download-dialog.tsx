
"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useActionState } from "react";
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Download, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { submitBrochureRequest, type BrochureFormState } from "@/app/actions";

interface BrochureDownloadDialogProps {
  pdfPath: string;
  courseName: string;
}

const brochureFormSchema = z.object({
  mobileNumber: z.string().min(8, "Please enter a valid mobile number."),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')),
  courseName: z.string(),
});

type BrochureFormValues = z.infer<typeof brochureFormSchema>;

const initialState: BrochureFormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
      {pending ? "Submitting..." : "Get Brochure"}
    </Button>
  );
}

export function BrochureDownloadDialog({ pdfPath, courseName }: BrochureDownloadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(submitBrochureRequest, initialState);
  const { toast } = useToast();

  const form = useForm<BrochureFormValues>({
    resolver: zodResolver(brochureFormSchema),
    defaultValues: {
      mobileNumber: "",
      email: "",
      courseName: courseName,
    },
  });

  useEffect(() => {
    if (state.message && (state.success || (state.issues && state.issues.length > 0))) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }

    if (state.success) {
      // Trigger the download
      window.open(pdfPath, '_blank');
      // Reset form and close dialog
      form.reset();
      setIsOpen(false);
    }
  }, [state, toast, form, pdfPath]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Download Brochure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Download {courseName} Brochure</DialogTitle>
          <DialogDescription>
            Please provide your mobile number to receive the brochure. Your information helps us connect with you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={formAction} className="space-y-4">
            <input type="hidden" {...form.register("courseName")} />
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='pt-2'>
              <SubmitButton />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

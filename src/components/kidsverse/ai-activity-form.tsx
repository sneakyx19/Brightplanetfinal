
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from 'react-dom';
import { generateActivityPlanAction, type ActivityPlanState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, AlertTriangle, Loader2 } from "lucide-react";

const activityPlanSchema = z.object({
  childAge: z.coerce.number().min(1, "Age must be at least 1").max(18, "Age must be 18 or less."),
  preferences: z.string().min(3, { message: "Preferences must be at least 3 characters long." }),
});

type ActivityPlanFormValues = z.infer<typeof activityPlanSchema>;

const initialState: ActivityPlanState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      {pending ? "Generating Plan..." : "Generate Plan"}
    </Button>
  );
}

export function AiActivityForm() {
  const [state, formAction] = useActionState(generateActivityPlanAction, initialState);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const { toast } = useToast();
  const { pending } = useFormStatus();

  const form = useForm<ActivityPlanFormValues>({
    resolver: zodResolver(activityPlanSchema),
    defaultValues: {
      childAge: '' as any,
      preferences: "",
    },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
    if (state.success && state.plan?.activityPlan) {
      setGeneratedPlan(state.plan.activityPlan);
      toast({
        title: "Plan Generated!",
        description: "Your customized activity plan is ready.",
      });
      form.reset({ childAge: '' as any, preferences: '' });
    }
     if (!state.success && state.errors) {
      if (state.errors.childAge) form.setError('childAge', { type: 'server', message: state.errors.childAge[0] });
      if (state.errors.preferences) form.setError('preferences', { type: 'server', message: state.errors.preferences[0] });
    }
  }, [state, toast, form]);

  useEffect(() => {
    // When a new generation starts, clear the old plan
    if (pending) {
      setGeneratedPlan(null);
    }
  }, [pending]);
  

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create Activity Plan</CardTitle>
            <CardDescription>Enter your child's age and interests to generate a custom plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                action={formAction}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="childAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Child's Age (years)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interests & Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., dinosaurs, painting, outdoor play, building blocks"
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter a comma-separated list of interests.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {state.errors?.general && (
                  <p className="text-sm font-medium text-destructive flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2"/> {state.errors.general}
                  </p>
                )}
                <SubmitButton />
              </form>
            </Form>
          </CardContent>
        </Card>

        {pending && (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center"><Sparkles className="mr-2 h-6 w-6 text-primary" /> Generating Your Plan...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Please wait while we tailor the perfect activities for your child!</p>
                    <div className="mt-4 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
                        <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
                        <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
                    </div>
                </CardContent>
            </Card>
        )}

        {!pending && generatedPlan && (
            <Card className="shadow-xl bg-accent/30">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center text-primary"><Sparkles className="mr-2 h-6 w-6" /> Your Custom Activity Plan!</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                        {generatedPlan}
                    </div>
                </CardContent>
            </Card>
        )}
         {!pending && !generatedPlan && (
             <Card className="shadow-lg border-dashed border-muted-foreground/50">
                <CardContent className="pt-6 text-center text-muted-foreground">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Your generated activity plan will appear here.</p>
                    <p className="text-sm">Fill out the form and let our AI create some fun!</p>
                </CardContent>
            </Card>
         )}
    </div>
  );
}

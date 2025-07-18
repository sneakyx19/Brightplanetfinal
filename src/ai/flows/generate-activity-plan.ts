
'use server';

/**
 * @fileOverview AI activity plan generator for creating tailored activity plans for children.
 *
 * - generateActivityPlan - A function that generates activity plans based on child's age and preferences.
 * - GenerateActivityPlanInput - The input type for the generateActivityPlan function.
 * - GenerateActivityPlanOutput - The return type for the generateActivityPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { classesData } from '@/lib/data';

const GenerateActivityPlanInputSchema = z.object({
  childAge: z.number().describe('The age of the child in years.'),
  preferences: z
    .string()
    .describe(
      'A comma separated list of the child\s interests and preferences for activities.'
    ),
  availableCourses: z.string().describe('A list of available courses to suggest from.')
});
export type GenerateActivityPlanInput = z.infer<
  typeof GenerateActivityPlanInputSchema
>;

const GenerateActivityPlanOutputSchema = z.object({
  activityPlan: z
    .string()
    .describe(
      'A detailed activity plan tailored to the child\s age and preferences. It should also include suggestions for relevant courses.'
    ),
});
export type GenerateActivityPlanOutput = z.infer<
  typeof GenerateActivityPlanOutputSchema
>;

export async function generateActivityPlan(
  input: Omit<GenerateActivityPlanInput, 'availableCourses'>
): Promise<GenerateActivityPlanOutput> {
  const courseList = classesData
    .map(c => `- ${c.name} (Ages: ${c.ageGroups}): ${c.description}`)
    .join('\n');

  return generateActivityPlanFlow({...input, availableCourses: courseList});
}

const prompt = ai.definePrompt({
  name: 'generateActivityPlanPrompt',
  input: {schema: GenerateActivityPlanInputSchema},
  output: {schema: GenerateActivityPlanOutputSchema},
  prompt: `You are an AI activity plan generator for children.

  Based on the child's age and preferences, create a short, simple, and engaging activity plan with 3-4 bullet points.

  After creating the activity plan, analyze the child's age and preferences and suggest 1-2 relevant courses from the list provided below. The suggestions should be clearly marked under a "Suggested Courses" heading. Make sure the suggested courses are appropriate for the child's age.

  Child's Age: {{{childAge}}}
  Preferences: {{{preferences}}}

  Available Courses:
  {{{availableCourses}}}

  Generate the activity plan and course suggestions now.`,
});

const generateActivityPlanFlow = ai.defineFlow(
  {
    name: 'generateActivityPlanFlow',
    inputSchema: GenerateActivityPlanInputSchema,
    outputSchema: GenerateActivityPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

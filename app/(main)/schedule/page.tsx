
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { scheduleData, type ScheduleEvent } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { format, parseISO, isSameDay, isValid, getDay, setHours, setMinutes, setSeconds, setMilliseconds } from 'date-fns';
import { siteConfig } from '@/lib/metadata';
import Head from 'next/head';

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSelectedDate(new Date()); // Default to today only on client-side
  }, []);
  
  const eventsForSelectedDate = useMemo(() => {
    if (!selectedDate || !isValid(selectedDate)) return [];

    // 1. Get events for the specific selected date from scheduleData
    const specificEvents = scheduleData.filter(event => {
      const eventDate = parseISO(event.startTime);
      return isValid(eventDate) && isSameDay(eventDate, selectedDate);
    });

    // 2. Generate recurring events based on the day of the week
    const recurringEvents: ScheduleEvent[] = [];
    const dayOfWeek = getDay(selectedDate); // Sunday = 0, Monday = 1, ..., Saturday = 6

    const createRecurringEventOnDay = (
      title: string,
      dayName: string,
      startHour: number,
      startMinute: number,
      endHour: number,
      endMinute: number,
      idPrefix: string,
      type: ScheduleEvent['type'] = 'class'
    ): ScheduleEvent => {
        const baseTime = selectedDate; // selectedDate is guaranteed to be valid here
        const startTime = setMilliseconds(setSeconds(setMinutes(setHours(baseTime, startHour), startMinute), 0), 0);
        const endTimeDate = setMilliseconds(setSeconds(setMinutes(setHours(baseTime, endHour), endMinute), 0), 0);

        return {
            id: `${idPrefix}-${format(selectedDate, 'yyyy-MM-dd')}`,
            title: title,
            type: type,
            startTime: startTime.toISOString(),
            endTime: endTimeDate.toISOString(),
            description: `Recurring ${type} every ${dayName}.`
        };
    };

    const artsAndCraftsStartTime = { hour: 17, minute: 30 }; // 5:30 PM
    const artsAndCraftsEndTime = { hour: 20, minute: 0 }; // 8:00 PM

    const playSchoolMorningStartTime = { hour: 9, minute: 0 }; // 9:00 AM
    const playSchoolMorningEndTime = { hour: 12, minute: 0 }; // 12:00 PM
    const playSchoolAfternoonStartTime = { hour: 13, minute: 0 }; // 1:00 PM
    const playSchoolAfternoonEndTime = { hour: 16, minute: 0 }; // 4:00 PM


    if (dayOfWeek >= 0 && dayOfWeek <= 4) { // Sunday (0) to Thursday (4)
      // Play School Batches
      recurringEvents.push(createRecurringEventOnDay('Play School - Morning Batch', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'][dayOfWeek], playSchoolMorningStartTime.hour, playSchoolMorningStartTime.minute, playSchoolMorningEndTime.hour, playSchoolMorningEndTime.minute, `recurring-playschool-morning-${dayOfWeek}`));
      recurringEvents.push(createRecurringEventOnDay('Play School - Afternoon Batch', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'][dayOfWeek], playSchoolAfternoonStartTime.hour, playSchoolAfternoonStartTime.minute, playSchoolAfternoonEndTime.hour, playSchoolAfternoonEndTime.minute, `recurring-playschool-afternoon-${dayOfWeek}`));
    }


    if (dayOfWeek === 0) { // Sunday
        recurringEvents.push(createRecurringEventOnDay('Arts & Crafts Class', 'Sunday', artsAndCraftsStartTime.hour, artsAndCraftsStartTime.minute, artsAndCraftsEndTime.hour, artsAndCraftsEndTime.minute, 'recurring-ac-sun'));
    } else if (dayOfWeek === 1) { // Monday
        recurringEvents.push(createRecurringEventOnDay('Public Speaking Class', 'Monday', 15, 0, 16, 0, 'recurring-ps-mon')); // 3 PM - 4 PM
        recurringEvents.push(createRecurringEventOnDay('Arts & Crafts Class', 'Monday', artsAndCraftsStartTime.hour, artsAndCraftsStartTime.minute, artsAndCraftsEndTime.hour, artsAndCraftsEndTime.minute, 'recurring-ac-mon'));
    } else if (dayOfWeek === 2) { // Tuesday
        recurringEvents.push(createRecurringEventOnDay('Arts & Crafts Class', 'Tuesday', artsAndCraftsStartTime.hour, artsAndCraftsStartTime.minute, artsAndCraftsEndTime.hour, artsAndCraftsEndTime.minute, 'recurring-ac-tue'));
    } else if (dayOfWeek === 3) { // Wednesday
        recurringEvents.push(createRecurringEventOnDay('Public Speaking Class', 'Wednesday', 15, 0, 16, 0, 'recurring-ps-wed')); // 3 PM - 4 PM
        recurringEvents.push(createRecurringEventOnDay('Arts & Crafts Class', 'Wednesday', artsAndCraftsStartTime.hour, artsAndCraftsStartTime.minute, artsAndCraftsEndTime.hour, artsAndCraftsEndTime.minute, 'recurring-ac-wed'));
    } else if (dayOfWeek === 4) { // Thursday
        recurringEvents.push(createRecurringEventOnDay('Arts & Crafts Class', 'Thursday', artsAndCraftsStartTime.hour, artsAndCraftsStartTime.minute, artsAndCraftsEndTime.hour, artsAndCraftsEndTime.minute, 'recurring-ac-thu'));
    } else if (dayOfWeek === 5) { // Friday
        recurringEvents.push(createRecurringEventOnDay('Public Speaking Class', 'Friday', 18, 0, 19, 0, 'recurring-ps-fri')); // 6 PM - 7 PM
        recurringEvents.push(createRecurringEventOnDay('Arts & Crafts Class', 'Friday', artsAndCraftsStartTime.hour, artsAndCraftsStartTime.minute, artsAndCraftsEndTime.hour, artsAndCraftsEndTime.minute, 'recurring-ac-fri'));
    } else if (dayOfWeek === 6) { // Saturday
        recurringEvents.push(createRecurringEventOnDay('Mental Math Class', 'Saturday', 10, 0, 12, 0, 'recurring-mm-sat')); // 10 AM - 12 PM
        recurringEvents.push(createRecurringEventOnDay('Public Speaking Class', 'Saturday', 18, 0, 19, 0, 'recurring-ps-sat')); // 6 PM - 7 PM
        // No Arts & Crafts on Saturday
    }
    
    const allEvents = [...specificEvents];

    recurringEvents.forEach(recurringEvent => {
        const specificExistsForThisSlot = specificEvents.some(specificEvent =>
            specificEvent.title === recurringEvent.title &&
            parseISO(specificEvent.startTime).getTime() === parseISO(recurringEvent.startTime).getTime()
        );
        if (!specificExistsForThisSlot) {
            allEvents.push(recurringEvent);
        }
    });

    return allEvents.sort((a,b) => parseISO(a.startTime).getTime() - parseISO(b.startTime).getTime());

  }, [selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  }

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
    <Head>
        <title>Class and Workshop Schedule | Bright Planet Hub Kuwait</title>
        <meta name="description" content="View the class schedule for Bright Planet Hub in Salmiya, Kuwait. Find dates and times for our kids classes, workshops, and check venue availability." />
    </Head>
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Our Schedule</h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Find upcoming classes, workshops, and venue availability. Select a date to see the schedule.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1 shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Select Date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              initialFocus
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-xl min-h-[300px]">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Events for: {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : 'No date selected'}
            </CardTitle>
            {!selectedDate && <CardDescription>Please select a date from the calendar to view events.</CardDescription>}
          </CardHeader>
          <CardContent>
            {selectedDate && eventsForSelectedDate.length > 0 ? (
              <ul className="space-y-4">
                {eventsForSelectedDate.map((event) => (
                  <li key={event.id} className="p-4 border rounded-lg shadow-sm bg-background hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {format(parseISO(event.startTime), 'h:mm a')} - {format(parseISO(event.endTime), 'h:mm a')}
                        </p>
                        {event.description && <p className="text-xs mt-1">{event.description}</p>}
                      </div>
                      <Badge variant={event.type === 'workshop' ? 'default' : event.type === 'venue booking' ? 'destructive' : 'secondary'} className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            ) : selectedDate ? (
              <p className="text-muted-foreground text-center py-8">No events scheduled for this date.</p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}

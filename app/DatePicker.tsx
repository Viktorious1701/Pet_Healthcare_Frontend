"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { DateRange } from "react-day-picker"

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})

export function DatePickerForm({
    className,
  }: React.HTMLAttributes<HTMLDivElement>) {
  
    type DateRange = {
        from: Date | undefined;
        to: Date | undefined;
      };

      const handleSelect = (range: DateRange | undefined) => {
        if (range && range.from && range.to) {
          setDate(range);
        }
      };
      
      const [date, setDate] = React.useState<DateRange>({
        from: new Date(2024, 0, 20),
        to: addDays(new Date(2024, 0, 20), 20),
      })
  
      const FormSchema = z.object({
        dob: z.object({
          from: z.date(),
          to: z.date(),
        }),
      })
      
      type DateRangeData = z.infer<typeof FormSchema>;

const form = useForm<DateRangeData>({
  resolver: zodResolver(FormSchema),
})

// Update the 'dob' field whenever the 'date' state variable changes
React.useEffect(() => {
  form.setValue('dob', date)
}, [date, form])
  
    
      console.log(form.formState.errors) // Log form errors
    
      function onSubmit(data: DateRangeData) {
        console.log('Form submitted with data:', data) // Log form data
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }
      
      // ...
      

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                            </>
                        ) : (
                            format(date.from, "LLL dd, y")
                        )
                        ) : (
                        <span>Pick a date</span>
                        )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

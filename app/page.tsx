import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DatePickerForm } from "./DatePicker";
import { ToastDemo } from "./Toast";
import { DatePickerWithRange } from "./DateRangePicker";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <DatePickerForm />
    </div>
  );
}
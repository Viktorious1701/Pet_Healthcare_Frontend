import { FC, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import ThemeSwitch from "@/components/vet_components/theme-switch";
import { UserNav } from "@/components/vet_components/user-nav";

import { useTheme } from "@/components/vet_components/theme-provider"; // replace with the actual path
import "./Theme.css";

import { useNavigate } from "react-router-dom";
import { APPOINTMENT_DETAILS } from "@/Route/router-const";
import {
  appointmentGetVetIdAPI,
  appointmentVetAPI,
} from "@/Services/AppointmentService";
import Sonner from "@/components/vet_components/sonner";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const App: FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await appointmentGetVetIdAPI(); // Fetch the vet details
      const vetId = (response as unknown as { userId: string }).userId; // Type assertion
      if (vetId) {
        const appointments = await appointmentVetAPI(vetId);
        console.log(appointments);
        if (appointments) {
          const newEvents = appointments.map((appointment) => ({
            title: appointment.service, // Assuming 'service' is a string that can serve as the title
            start: new Date(`${appointment.date}T${appointment.slotStartTime}`),
            end: new Date(`${appointment.date}T${appointment.slotEndTime}`),
            status: appointment.status,
          }));
          setEvents(newEvents);
        }
      }
    };
    fetchAppointments();
  }, []);

  const handleSelectEvent = () => {
    navigate(`/vet/${APPOINTMENT_DETAILS}`);
  };

  const { theme } = useTheme();
  const calendarStyle =
    theme === "dark"
      ? { height: "100vh", backgroundColor: "--background", color: "#fff" }
      : { height: "100vh", color: "#000" };
  const themeClass = theme === "dark" ? "dark-mode" : "light-mode";

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <Sonner />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className={`flex flex-col ${themeClass}`} fixedHeight>
        <Calendar
          defaultView="week"
          events={events}
          localizer={localizer}
          style={calendarStyle}
          onSelectEvent={handleSelectEvent}
        />
      </LayoutBody>
    </Layout>
  );
};

export default App;

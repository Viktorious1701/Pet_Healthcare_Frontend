import { FC, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { addHours } from "date-fns";
import { startOfHour } from "date-fns";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import ThemeSwitch from "@/components/vet_components/theme-switch";
import { UserNav } from "@/components/customer_components/user-nav";

import { useTheme } from "@/components/customer_components/theme-provider"; // Replace with the actual path to your theme provider hook or context
import "./Theme.css"; // Ensure this imports styles for dark and light mode

const locales = {
  "en-US": enUS,
};

const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 2);

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const App: FC = () => {
  const [events] = useState<Event[]>([
    {
      title: "Learn cool stuff",
      start,
      end,
    },
  ]);

  const { theme } = useTheme();

  // Define styles based on the theme
  const calendarStyle = {
    height: "100vh",
    backgroundColor: theme === "dark" ? "#1a202c" : "#edf2f7", // Adjust background color based on theme
    color: theme === "dark" ? "#fff" : "#000", // Adjust text color based on theme
  };

  const themeClass = theme === "dark" ? "dark-mode" : "light-mode";

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
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
        />
      </LayoutBody>
    </Layout>
  );
};

export default App;

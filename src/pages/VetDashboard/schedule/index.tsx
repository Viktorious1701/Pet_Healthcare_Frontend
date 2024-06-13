import { FC, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import { addHours } from 'date-fns'
import { startOfHour } from 'date-fns'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import ThemeSwitch from '@/components/vet_components/theme-switch'
import { UserNav } from '@/components/vet_components/user-nav'

import { useTheme } from '@/components/vet_components/theme-provider'; // replace with the actual path
import './Theme.css';

const locales = {
  'en-US': enUS,
}
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const App: FC = () => {
  const [events] = useState<Event[]>([
    {
      title: 'Learn cool stuff',
      start,
      end,
    },
  ])

  const { theme } = useTheme();
  const calendarStyle = theme === 'dark' ? { height: '100vh', backgroundColor: '--background', color: '#fff' } : { height: '100vh', color: '#000' };
  const themeClass = theme === 'dark' ? 'dark-mode' : 'light-mode';

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className={`flex flex-col ${themeClass}`} fixedHeight>
        <Calendar
          defaultView='week'
          events={events}
          localizer={localizer}
          style={calendarStyle}
        />
      </LayoutBody>
    </Layout>
  )
}

export default App
import Sidebar from './sidebar';
import useIsCollapsed from '@/components/hooks/use-is-collapsed';
import EmployeeDashboardWrapper from './EmployeeDashboardWrapper';

export default function EmployeeDashboard() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <EmployeeDashboardWrapper />
      </main>
    </div>
  );
}

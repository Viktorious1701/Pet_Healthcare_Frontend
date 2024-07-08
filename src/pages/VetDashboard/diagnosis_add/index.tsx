import { FC } from 'react';
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout';
import ThemeSwitch from '@/components/vet_components/theme-switch';
import { UserNav } from '@/components/vet_components/user-nav';
import Form from '@/pages/VetDashboard/diagnosis_add/add_form/form';

const App: FC = () => {
  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className={`flex flex-col`} fixedHeight>
        <Form />
      </LayoutBody>
    </Layout>
  );
};

export default App;

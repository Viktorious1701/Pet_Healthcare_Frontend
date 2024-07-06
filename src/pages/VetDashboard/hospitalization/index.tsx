import { FC, useState } from 'react'
import { DataTableDemo } from './appointments/DataTableDemo'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import ThemeSwitch from '@/components/vet_components/theme-switch'
import { UserNav } from '@/components/vet_components/user-nav'
import { DataTableDemo2 } from './appointments/DataTableDemo2'

const App: FC = () => {
  const [selectedHospitalizationId, setSelectedHospitalizationId] = useState<number | undefined>(undefined)

  const handleHospitalizationSelect = (id: number) => {
    setSelectedHospitalizationId(id)
  }

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody className='flex flex-col max-h-screen overflow-y-auto' fixedHeight>
        <DataTableDemo onHospitalizationSelect={handleHospitalizationSelect} />
        {selectedHospitalizationId !== undefined ? (
          <DataTableDemo2 hospitalizationId={selectedHospitalizationId} />
        ) : (
          <div>Select a hospitalization to view details</div>
        )}
      </LayoutBody>
    </Layout>
  )
}

export default App

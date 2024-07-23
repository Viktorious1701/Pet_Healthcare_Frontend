import { Kennel, KennelPost } from '@/Models/Kennel';
import { kennelGetAPI } from '@/Services/KennelService';
import { Box, Grid } from '@mui/material';
import { Card, CardHeader } from '@nextui-org/card';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import KennelAddModal from './KennelAddModal';
import KennelDataGrid from './KennelDataGrid';

const KennelManagement = () => {
  const [kennels, setKennels] = useState<Kennel[]>([]);
  const [kennelAdd, setKennelAdd] = useState<KennelPost>();
  const [kennelDelete, setKennelDelete] = useState<Kennel>();

  const availableKennels = kennels.filter((kennel) => kennel.isAvailable).length;
  const occupiedKennels = kennels.filter((kennel) => !kennel.isAvailable).length;

  const getKennels = async () => {
    await kennelGetAPI()
      .then((res) => {
        if (res?.data) {
          setKennels(res.data);
        }
      })
      .catch((e) => {
        toast.error('Server error occurred', e);
      });
  };

  const handleKennelAdd = (kennel: KennelPost) => {
    setKennelAdd(kennel);
  };

  const handleKennelDelete = (kennel: Kennel) => {
    setKennelDelete(kennel);
  };

  useEffect(() => {
    getKennels();
  }, [kennelAdd, kennelDelete]);

  return (
    <div className=' m-10'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Total Kennels Card */}
          <Grid item xs={12} md={3}>
            <Card className='h-full w-full'>
              <CardHeader className='justify-between'>
                <div className='flex-col gap-5 p-4'>
                  <div className='flex flex-col gap-1 items-start justify-center'>
                    <h2 className='text-xl text-default-600'>Total Kennels</h2>
                  </div>
                  <div>
                    <h1 className='text-4xl'>{kennels.length}</h1>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Grid>

          {/* Kennel Availability Pie Chart */}
          <Grid item xs={12} md={9}>
            <Card className='h-full w-full'>
              <CardHeader className='justify-between'>
                <div className='flex flex-col p-4'>
                  <div className='flex flex-col gap-1 items-start justify-center'>
                    <h2 className='text-xl text-default-600'>Kennel Availability</h2>
                  </div>
                  <div>
                    <PieChart
                      series={[
                        {
                          data: [
                            {
                              id: 0,
                              value: availableKennels,
                              label: 'Available',
                              color: 'green'
                            },
                            {
                              id: 1,
                              value: occupiedKennels,
                              label: 'Occupied',
                              color: 'orange'
                            }
                          ],
                          innerRadius: 30,
                          outerRadius: 100,
                          paddingAngle: 5,
                          cornerRadius: 5
                        }
                      ]}
                      width={400}
                      height={200}
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Grid>

          {/* Kennel Data Grid */}
          <Grid item xs={13}>
            <Card className='h-full w-full'>
              <CardHeader className='justify-between'>
                <div className='flex-col gap-5 p-4'>
                  <div className='flex flex-row gap-1 items-start justify-between mb-4'>
                    <h1 className='text-2xl text-black font-bold'>Kennels</h1>
                    <KennelAddModal onKennelAdded={handleKennelAdd} />
                  </div>
                  <div>
                    <KennelDataGrid onKennelDelete={handleKennelDelete} kennels={kennels} setKennels={setKennels} />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default KennelManagement;

/* eslint-disable react-hooks/exhaustive-deps */
import { AppointmentDetailGet } from '@/Models/AppointmentDetail'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { toast } from 'sonner'
import { petAppointmentDetailGetAPI } from '@/Services/AppointmentDetailService'

interface PetRecordTableProps {
  petId: number
}

const PetRecordTable: React.FC<PetRecordTableProps> = ({ petId }) => {
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetailGet[]>([])
  const getAppointmentDetails = async () => {
    await petAppointmentDetailGetAPI(petId)
      .then((res) => {
        if (res?.data) {
          setAppointmentDetails(res.data)
        }
      })
      .catch((e) => {
        toast.error('Server error occurred', e)
      })
  }

  useEffect(() => {
    getAppointmentDetails()
  }, [])
  return (
    <Table>
      <TableCaption>A list of your pet medical record details.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Vet</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Diagnosis</TableHead>
          <TableHead>Treatment</TableHead>
          <TableHead>Medication</TableHead>
          <TableHead className='text-right'>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointmentDetails.map((appointmentDetail) => (
          <TableRow key={appointmentDetail.appointmentDetailId}>
            <TableCell className='font-medium'>{appointmentDetail.appointmentDetailId}</TableCell>
            <TableCell>{appointmentDetail.vetName}</TableCell>
            <TableCell>{appointmentDetail.service}</TableCell>
            <TableCell>{appointmentDetail.diagnosis}</TableCell>
            <TableCell>{appointmentDetail.medication}</TableCell>
            <TableCell>{appointmentDetail.treatment}</TableCell>
            <TableCell className='text-right'>{appointmentDetail.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>Total Visits</TableCell>
          <TableCell className='text-right'>{appointmentDetails.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default PetRecordTable

import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { getPetHealthTrackByHospitalizationId } from '@/Services/PetHealthTrackService'
import { PetHealthTrack as PetHealthTrackDTO } from '@/Models/PetHealthTrack'
import { format } from 'date-fns'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useTheme } from '@/components/vet_components/theme-provider'

const PetHealthTrack: React.FC = () => {
  const { hospitalizationId } = useParams<{ hospitalizationId: string }>()
  const navigate = useNavigate()
  const [healthTrack, setHealthTrack] = useState<PetHealthTrackDTO[]>([])
  const [filteredHealthTrack, setFilteredHealthTrack] = useState<PetHealthTrackDTO[]>([])
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()

  const fetchHealthTrack = useCallback(async () => {
    if (!hospitalizationId) return
    setLoading(true)
    try {
      const response = await getPetHealthTrackByHospitalizationId(Number(hospitalizationId))
      const data = response || [];
      setHealthTrack(data)
      setFilteredHealthTrack(data)
    } catch (error) {
      setError('Error fetching pet health track.')
      console.error('Error fetching pet health track:', error)
      setHealthTrack([])
      setFilteredHealthTrack([])
    }
    setLoading(false)
  }, [hospitalizationId])

  useEffect(() => {
    fetchHealthTrack()
  }, [fetchHealthTrack])

  useEffect(() => {
    if (Array.isArray(healthTrack)) {
      const filtered = statusFilter
        ? healthTrack.filter((entry) => String(entry.status) === statusFilter)
        : healthTrack
      setFilteredHealthTrack(filtered)
    } else {
      setFilteredHealthTrack([])
    }
  }, [healthTrack, statusFilter])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  if (filteredHealthTrack.length === 0) return <div className=' flex justify-center'>No health track data available.</div>

  const getStatusString = (status: string): string => {
    switch (status) {
      case '0':
        return 'Healthy'
      case '1':
        return 'Sick'
      case '2':
        return 'Injured'
      default:
        return ''
    }
  }

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between rounded-md p-2 bg-gray-800 text-white'>
        <h1 className='text-3xl font-bold'>Pet Health Track</h1>
        <div className='flex items-center'>
          <Button onClick={() => navigate(-1)} className='mr-4 bg-gray-800 text-white'>
            Go Back
          </Button>
          <label htmlFor='statusFilter' className='mr-2'>
            Filter by Status:
          </label>
          <select
            id='statusFilter'
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter((e.target.value as string) || null)}
            className='rounded-md px-2 py-1 bg-gray-700 text-white'
          >
            <option value=''>All</option>
            <option value='0'>Healthy</option>
            <option value='1'>Sick</option>
            <option value='2'>Injured</option>
          </select>
        </div>
      </div>
      <div className='overflow-x-auto mt-4'>
        <Table>
          <TableCaption>A list of your pet's health track.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHealthTrack.map((entry, index) => (
              <TableRow
                key={index}
                className={`${theme === 'light' ? 'even:bg-gray-50 odd:bg-white hover:bg-gray-200' : 'even: bg-gray-700 odd:bg-slate-500'} `}
              >
                <TableCell>{entry.dateOnly ? format(new Date(entry.dateOnly), 'MM/dd/yyyy') : '-'}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{getStatusString(String(entry.status))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PetHealthTrack

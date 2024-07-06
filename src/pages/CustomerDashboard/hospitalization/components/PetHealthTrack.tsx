import React, { useEffect, useState } from 'react'
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
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()
  const itemsPerPage = 5 // Adjust as needed

  useEffect(() => {
    setLoading(true)
    const storedPetHealthTrack = sessionStorage.getItem('petHealthTrack')
    if (storedPetHealthTrack) {
      setHealthTrack(JSON.parse(storedPetHealthTrack))
      setLoading(false)
      return
    }
    const fetchHealthTrack = async () => {
      try {
        if (hospitalizationId) {
          const response = await getPetHealthTrackByHospitalizationId(Number(hospitalizationId))
          const data = (response as unknown as { data: PetHealthTrackDTO[] }).data
          setHealthTrack(data)
          sessionStorage.setItem('petHealthTrack', JSON.stringify(data))
        }
      } catch (error) {
        setError('Error fetching pet health track.')
        console.error('Error fetching pet health track:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHealthTrack()
  }, [hospitalizationId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  const filteredHealthTrack = statusFilter
    ? healthTrack.filter((entry) => String(entry.status) === (statusFilter as string))
    : healthTrack

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredHealthTrack.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

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
            {currentItems.map((entry, index) => (
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
        {/* Pagination */}
        <div className='mt-4 flex justify-between'>
          <Button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || currentPage === 0}
            className='bg-gray-800 text-white'
          >
            Previous
          </Button>
          <Button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredHealthTrack.length / itemsPerPage + 1)}
            className='bg-gray-800 text-white'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PetHealthTrack

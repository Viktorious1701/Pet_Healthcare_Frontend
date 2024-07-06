import { useEffect, useState } from 'react'
import SearchBar from '../navigation/SearchBar'
import { UserInfo } from '@/Models/User'
import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { customerGetAPI } from '@/Services/UserService'
import { toast } from 'sonner'
import { useLocation } from 'react-router'
import Default from '@/assets/Default_pfp.svg.png'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'

interface CustomerSelectProps {
  onSelectCustomer: (customerUserName: string) => void
}

const CustomerSelect: React.FC<CustomerSelectProps> = ({ onSelectCustomer }) => {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [userList, setUserList] = useState<UserInfo[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<string>('')

  const getCustomers = async () => {
    customerGetAPI('customer')
      .then((res) => {
        if (res?.data) {
          setUserList(res.data)
        }
      })
      .catch((e) => {
        toast.error('Server error occurred', e)
      })
  }

  useEffect(() => {
    getCustomers()
  }, [location])

  const handleCustomerChange = (userName: string) => {
    setSelectedCustomer(userName)
  }

  const handleCancel = () => {
    setSelectedCustomer('')
  }

  const handleSubmit = () => {
    if (selectedCustomer === '') {
      toast.warning('Please select a customer')
      return
    }
    onSelectCustomer(selectedCustomer)
  }

  const filteredUsers = userList.filter((user) => user.userName.toString().includes(searchTerm))

  return (
    <div>
      <div className='flex justify-between mx-10 mb-6'>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          className='bg-white border-2 border-custom-darkBlue p-2 rounded-md shadow-lg'
        />
        <Button className='ml-2 bg-custom-darkBlue text-white text-md' onClick={handleSubmit}>
          Confirm
        </Button>
      </div>
      <Divider />
      <div className='flex items-center mx-10 mt-4'>
        <Card className='shadow-none'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <p className='text-tiny uppercase font-bold'>Selected Customer</p>
          </CardHeader>
          <CardBody className='pt-2'>{selectedCustomer}</CardBody>
        </Card>
        {selectedCustomer && (
          <Button className='ml-4 bg-custom-lightCrimson text-white text-md' onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
      <Divider />
      <Carousel
        opts={{
          align: 'start'
        }}
        className='w-[80vw]'
      >
        <CarouselContent>
          {filteredUsers
            .sort((a, b) => a.userName.localeCompare(b.userName))
            .map((user, index) => (
              <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                <div className='p-10'>
                  <Button
                    key={index}
                    className='bg-white shadow-lg shadow-custom-lightBlue h-[45vh]'
                    onClick={() => handleCustomerChange(user.userName)}
                  >
                    <Card className='shadow-none'>
                      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                        <p className='text-tiny uppercase font-bold'>{user.userName}</p>
                        <small className='text-default-500'>{user.email}</small>
                        <h4 className='font-bold text-large'>{user.firstName + ' ' + user.lastName}</h4>
                      </CardHeader>
                      <CardBody className='overflow-visible py-2'>
                        <img
                          alt='Card background'
                          className='object-cover rounded-xl'
                          src={user.imageUrl ? user.imageUrl : Default}
                        />
                      </CardBody>
                    </Card>
                  </Button>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CustomerSelect

import Header from './Header'
import { Button } from './ui/button'
import Paw from '@/assets/Paw2.svg'
const Navbar = () => {
  return (
    <div className="flex bg-[#F3F4F6] pb-8 justify-between ">
      <div className="flex">
        <img src={Paw} className="ml-[3rem] mt-[2rem] w-[50px] h-[50px]" alt=""/>
        <Header />
      </div>
      <div className="mr-[3rem]">
        <Button className="bg-[#DB2777] mt-[2.25rem] justify-self-end">Login</Button>
      </div>
    </div>
  )
}

export default Navbar

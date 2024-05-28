import Header from "@/components/Navbar"

import { Button } from "@/components/ui/button"
import Paw from "@/assets/Paw2.svg"



export default function Home() {
  return (
    <>
    <div className="flex bg-[#F3F4F6] pb-8 justify-between ">
      <div className="flex">
        <img src={Paw} className="ml-[3rem] mt-[2rem] w-[50px] h-[50px]" />
        <Header />
      </div>
      <div className="mr-[3rem]">
        <Button className="bg-[#DB2777] mt-[2.25rem] justify-self-end">Login</Button>
      </div>
    </div>
    <div className="flex justify-center">
      
    </div>
    </>
  )
}

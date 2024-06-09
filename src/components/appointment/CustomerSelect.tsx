import { useEffect, useState } from "react";
import SearchBar from "../navigation/SearchBar";
import { UserGet } from "@/Models/User";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { customerGetAPI } from "@/Services/UserService";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

interface CustomerSelectProps {
  onSelectCustomer: (customerUserName: string) => void;
}

const CustomerSelect: React.FC<CustomerSelectProps> = ({
  onSelectCustomer,
}) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userList, setUserList] = useState<UserGet[]>([]);

  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  const getCustomers = async () => {
    customerGetAPI("customer")
      .then((res) => {
        if (res?.data) {
          setUserList(res?.data);
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  useEffect(() => {
    getCustomers();
  }, [location]);

  const handleCustomerChange = (userName: string) => {
    setSelectedCustomer(userName);
  };

  const handleSubmit = () => {
    if (selectedCustomer === "") {
      toast.warning("pls select a customer");
      return;
    }
    onSelectCustomer(selectedCustomer);
  }

  const filteredUsers = userList.filter((user) =>
    user.userName.toString().includes(searchTerm)
  );
  return (
    <div>
      <h1 className="ml-10 mb-4 text-4xl font-bold">
        Create an appointment for customer
      </h1>
      <div className="flex justify-between mx-10 mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button className="bg-custom-pink text-white text-md" onClick={handleSubmit}>Confirm</Button>
      </div>
      <Divider />
      <div className="mx-10">
        <Card className="shadow-none">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">Selected Customer</p>
          </CardHeader>
          <CardBody className="">
            {selectedCustomer}
          </CardBody>
        </Card>
      </div>
      <Divider />
      <div className="m-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredUsers.map((user, index) => (
          <Button
            key={index}
            className="bg-white shadow-lg shadow-custom-lightBlue h-auto"
            onClick={() => handleCustomerChange(user.userName)}
          >
            <Card className="shadow-none">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{user.userName}</p>
                <small className="text-default-500">{user.email}</small>
                <h4 className="font-bold text-large">
                  {user.firstName + " " + user.lastName}
                </h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={
                    user.imageURL !== ""
                      ? "https://nextui.org/images/hero-card-complete.jpeg"
                      : user.imageURL
                  }
                  width={270}
                />
              </CardBody>
            </Card>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CustomerSelect;

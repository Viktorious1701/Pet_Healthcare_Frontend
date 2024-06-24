import { Button } from "@/components/custom/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "@/components/admin_components/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemeSwitch from "@/components/admin_components/theme-switch";
import { TopNav } from "@/components/admin_components/top-nav";
import { UserNav } from "@/components/admin_components/user-nav";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { UserInfo } from "@/Models/User";
import { useEffect, useState } from "react";
import { userGetAllAPI } from "@/Services/UserService";
import { toast } from "react-toastify";
import UsersDataGrid from "./components/UsersDataGrid";
import UserAddDialog from "./components/UserAddDialog";

const Accounts = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [userAdd, setUserAdd] = useState<UserInfo>();
  const [userDelete, setUserDelete] = useState<UserInfo>();
  const [userUpdate, setUserUpdate] = useState<UserInfo>();

  const activeUsers = users.filter((user) => user.isActive == true).length;
  const getAllUsers = async () => {
    await userGetAllAPI()
      .then((res) => {
        if (res) {
          setUsers(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occured", e);
      });
  };

  const handleUserAdd = (user: UserInfo) => {
    setUserAdd(user);
  };

  const handleUserDelete = (user: UserInfo) => {
    setUserDelete(user);
  };

  const handleUserUpdate = (user: UserInfo) => {
    setUserUpdate(user);
  };

  useEffect(() => {
    getAllUsers();
  }, [userAdd, userDelete, userUpdate]);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Accounts Management
          </h1>
          <div className="flex items-center space-x-2">
            <Button>Download</Button>
          </div>
        </div>
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-scroll pb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">User Details</TabsTrigger>
              <TabsTrigger value="reports">User Roles</TabsTrigger>
              <TabsTrigger value="notifications">Settings</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round((activeUsers / users.length) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Registrations
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Users Roles Breakdown
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-12">
                <CardHeader className="flex flex-row justify-between">
                  <CardTitle>Accounts</CardTitle>
                  <UserAddDialog onUserAdded={handleUserAdd}></UserAddDialog>
                </CardHeader>
                <CardContent className="px-2">
                  <UsersDataGrid
                    onUserUpdate={handleUserUpdate}
                    onUserDelete={handleUserDelete}
                    users={users}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  );
};

const topNav = [
  {
    title: "Overview",
    href: "",
    isActive: true,
  },
  {
    title: "Customers",
    href: "",
    isActive: false,
  },
  {
    title: "Products",
    href: "",
    isActive: false,
  },
  {
    title: "Settings",
    href: "",
    isActive: false,
  },
];

export default Accounts;

import { Button } from "@/components/custom/button";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Search } from "@/components/customer_components/search";
import ThemeSwitch from "@/components/customer_components/theme-switch";
import { TopNav } from "@/components/customer_components/top-nav";
import { UserNav } from "@/components/customer_components/user-nav";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HospitalizationPage from "./components/HospitalizationPage";

const Hospitalization = () => {
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
            Appointments
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
              <TabsTrigger value="analytics">Appointment Details</TabsTrigger>
              <TabsTrigger value="notifications">Settings</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-12">
                {/* <CardHeader className="flex flex-row justify-between">
                      
                    </CardHeader> */}
                <CardContent className="px-2">
                  <HospitalizationPage/>
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

export default Hospitalization;

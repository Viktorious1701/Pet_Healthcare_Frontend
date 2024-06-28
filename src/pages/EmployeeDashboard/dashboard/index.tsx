import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layout, LayoutBody } from "@/components/custom/layout";
// import { RecentSales } from "./components/recent-sales";
// import { Overview } from "./components/overview";
import { useEffect, useState } from "react";
import { hospitalizationListAPI } from "@/Services/HospitalizationService";
import { appointmentGetAPI } from "@/Services/AppointmentService";
import { AppointmentGet } from "@/Models/Appointment";
import { Hospitalization } from "@/Models/Hospitalization";
import { toast } from "sonner";
import RecentAppointments from "./components/recent-appointments";
import RecentHospitalizations from "./components/recent-hospitalizations";
import { PaymentRevenueGet } from "@/Models/Payment";
import { revenueGetAPI } from "@/Services/PaymentService";
import { UserInfo } from "@/Models/User";
import { customerGetAPI } from "@/Services/UserService";

export default function Dashboard() {
  const [revenue, setRevenue] = useState<PaymentRevenueGet>();
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const [hospitalizations, setHospitalizations] = useState<Hospitalization[]>(
    []
  );
  const [customers, setCustomers] = useState<UserInfo[]>([]);

  const getCustomers = async () => {
    await customerGetAPI("Customer")
      .then((res) => {
        if (res?.data) {
          setCustomers(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  const getAppointments = async () => {
    await appointmentGetAPI()
      .then((res) => {
        if (res?.data) {
          setAppointments(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  const getHospitalizations = async () => {
    await hospitalizationListAPI()
      .then((res) => {
        if (res.data) {
          setHospitalizations(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  const getRevenue = async () => {
    await revenueGetAPI()
      .then((res) => {
        if (res.data) {
          setRevenue(res.data);
        }
      })
      .catch((e) => {
        toast.error("Server error occurred", e);
      });
  };

  useEffect(() => {
    getRevenue();
    getCustomers();
    getAppointments();
    getHospitalizations();
  }, []);
  return (
    <Layout>
      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Dashboard
          </h1>
        </div>
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-scroll pb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
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
                  <div className="text-2xl font-bold">
                    ${revenue?.totalRevenue}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
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
                  <div className="text-2xl font-bold">{customers.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Appointments
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
                  <div className="text-2xl font-bold">
                    {
                      appointments.filter(
                        (appointment) =>
                          appointment.status === "Done" &&
                          new Date(appointment.date).getDate() ===
                            new Date().getDate()
                      ).length
                    }{" "}
                    /{" "}
                    {
                      appointments.filter(
                        (appointment) =>
                          new Date(appointment.date).getDate() ===
                          new Date().getDate()
                      ).length
                    }{" "}
                    appointments completed
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's revenue
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
                  <div className="text-2xl font-bold">${revenue?.dailyRevenue}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle>Current Hospitalization</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <RecentHospitalizations hospitalizations={hospitalizations} />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Appointments for today</CardTitle>
                  <CardDescription>
                    There are{" "}
                    {
                      appointments.filter(
                        (appointment) =>
                          new Date(appointment.date).getDate() ===
                          new Date().getDate()
                      ).length
                    }{" "}
                    appointments today.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentAppointments appointments={appointments} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  );
}

import { FC } from "react";
import { DataTableDemo } from "./appointments/DataTableDemo";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import ThemeSwitch from "@/components/vet_components/theme-switch";
import { UserNav } from "@/components/vet_components/user-nav";

const App: FC = () => {
  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody
        className="flex flex-col max-h-screen overflow-y-auto"
        fixedHeight
      >
        <DataTableDemo />
      </LayoutBody>
    </Layout>
  );
};

export default App;

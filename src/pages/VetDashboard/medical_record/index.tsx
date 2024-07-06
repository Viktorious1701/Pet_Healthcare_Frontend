import { FC } from "react";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import ThemeSwitch from "@/components/vet_components/theme-switch";
import { UserNav } from "@/components/vet_components/user-nav";
import { DataTableDemo2 } from "./appointments/DataTableDemo2";

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
      <LayoutBody className={`flex flex-col`} fixedHeight>
        <DataTableDemo2 />
      </LayoutBody>
    </Layout>
  );
};

export default App;

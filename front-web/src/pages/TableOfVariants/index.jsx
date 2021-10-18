import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { VcfTable } from "../../components/VcfTable";
import { SubMenu } from "../../components/SubMenu";

export const TableOfVariants = () => {
  return (
    <>
      <NavBar />
      <SubMenu />
      <main>
        <VcfTable />
      </main>
      <Footer />
    </>
  );
};

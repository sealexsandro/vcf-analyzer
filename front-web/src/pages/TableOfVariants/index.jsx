import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
// import "../DashBoard/styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { VcfTable } from "../../components/VcfTable";
import { QualityChart } from "../../charts/QualityChart";
import { Quality } from "../../charts/QualityChart/quality";
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

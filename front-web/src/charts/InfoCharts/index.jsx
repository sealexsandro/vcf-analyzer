import { useEffect } from "react";
import { PieChart } from "../../components/Charts/PieChart";
import http from "../../http-common";
import vcfFileSession from "../../services/vcfFileSession";
import { chartTypes } from "../../utils/chartComponents";
import { BoxplotInfoTag } from "../BoxplotInfoTags";
import { PieChartInfo } from "../PieChartInfo";

export const InfoCharts = ({ tagInfo, chartType }) => {
  //   if (chartType === chartTypes.PIECHART) {
    const { tagField } = tagInfo;
    console.log("Tag Tag Tag: ", tagField)
  if (tagField === "DP" || tagField === "AN" || tagField === "AC") {
    return <BoxplotInfoTag tagInfo={tagInfo} />;
  } else {
    return <PieChartInfo tagInfoCol={tagInfo}/>

  }
};

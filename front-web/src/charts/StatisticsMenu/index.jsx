import { chartComponents } from "../../utils/chartComponents";
import { QualityChart } from "../QualityChart";
import { VariantTypesChart } from "../VariantTypesChart";
import { BoxplotInfoTag } from "../BoxplotInfoTags";

export const StatisticsMenu = ({ chartComponent, tagInfo }) => {

  const dashPageComponent = () => {
    switch (chartComponent) {
      case chartComponents.VARIANT_QUALITY: {
        return <QualityChart />;
      }
      case chartComponents.VARIANT_TYPES: {
        return <VariantTypesChart />;
      }
      case chartComponents.INFO_STATISTICS: {
        console.log("Chamou BoxPlot")
        return <BoxplotInfoTag tagInfo={tagInfo} />;
      }
      default:
        throw new Error("ChartComponent is not defined");
    }
  };

  return <>{dashPageComponent()}</>;
};

import { FC } from 'react';
import { IAssetPriceResponses } from '../../../common/types/assets';
interface IAreaChartProps {
    data: IAssetPriceResponses;
}
declare const LineChart: FC<IAreaChartProps>;
export default LineChart;

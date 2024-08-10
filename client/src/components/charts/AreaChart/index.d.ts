import { FC } from 'react';
import { IAssetPriceData } from '../../../common/types/assets';
interface IAreaChartProps {
    data: IAssetPriceData[];
}
declare const AreaChart: FC<IAreaChartProps>;
export default AreaChart;

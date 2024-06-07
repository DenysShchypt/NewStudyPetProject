import { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IAllAsset } from '../../common/types/assets';

interface ITopPriceComponentProps {
  data: IAllAsset[];
}

const TopPriceComponent: FC<ITopPriceComponentProps> = ({
  data,
}): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name currencies</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Changes (%)</TableCell>
            <TableCell align="right">Changes ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(element => (
            <TableRow
              key={element.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {element.NAME}
              </TableCell>
              <TableCell align="right">
                {element.PRICE_USD.toFixed(2)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    element.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0
                      ? '#A9FFA7'
                      : '#FFA7A7',
                }}
              >
                {element.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD.toFixed(2)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    element.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0
                      ? '#A9FFA7'
                      : '#FFA7A7',
                }}
              >
                {element.SPOT_MOVING_24_HOUR_CHANGE_USD.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopPriceComponent;

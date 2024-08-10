import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Typography } from '@mui/material';
const TopPriceComponent = ({ data, }) => {
    return (_jsx(TableContainer, { component: Paper, children: _jsxs(Table, { sx: { minWidth: 650 }, "aria-label": "simple table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Name currencies" }), _jsx(TableCell, { align: "right", children: "Price" }), _jsx(TableCell, { align: "right", children: "Changes (%)" }), _jsx(TableCell, { align: "right", children: "Changes ($)" })] }) }), _jsx(TableBody, { children: data.map((element) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsxs(TableCell, { component: "th", scope: "row", sx: {
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    gap: '8px',
                                }, children: [_jsx(Avatar, { sx: {
                                            width: 30,
                                            height: 30,
                                        }, src: element.LOGO_URL }), _jsx(Typography, { children: element.NAME })] }), _jsx(TableCell, { align: "right", children: element.PRICE_USD.toFixed(2) }), _jsx(TableCell, { align: "right", sx: {
                                    color: element.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0
                                        ? '#A9FFA7'
                                        : '#FFA7A7',
                                }, children: element.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD.toFixed(2) }), _jsx(TableCell, { align: "right", sx: {
                                    color: element.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD > 0
                                        ? '#A9FFA7'
                                        : '#FFA7A7',
                                }, children: element.SPOT_MOVING_24_HOUR_CHANGE_USD.toFixed(2) })] }, element.ID))) })] }) }));
};
export default TopPriceComponent;

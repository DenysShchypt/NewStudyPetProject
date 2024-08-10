import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography, useTheme, } from '@mui/material';
import { RootStyledDeleteUser } from './styles';
import { tokens } from '../../theme';
import { LoadingButtonStyled } from '../GeneralComponentsStyles';
import { useNavigate } from 'react-router-dom';
import { removeUserAccount } from '../../store/thunks/settings';
import { setLoading } from '../../store/slice/auth';
const RemoveUser = () => {
    const [checked, setChecked] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useAppSelector(state => state.settings.user.id);
    const handleDelete = async () => {
        await dispatch(removeUserAccount(userId));
        localStorage.removeItem('token');
        dispatch(setLoading(false));
        navigate('/login');
    };
    return (_jsxs(RootStyledDeleteUser, { container: true, children: [_jsx(Grid, { item: true, className: "tabHeading", children: _jsx(Typography, { variant: "h2", children: "Delete Account" }) }), _jsx(Grid, { item: true, className: "alertMessage", children: _jsx(Typography, { variant: "body1", children: "Are you sure you want to delete your account?" }) }), _jsx(Grid, { item: true, className: "checkItem", children: _jsx(FormGroup, { children: _jsx(FormControlLabel, { sx: { justifyContent: 'center' }, control: _jsx(Checkbox, { checked: checked, onChange: () => setChecked(!checked), sx: {
                                color: colors.blue,
                                '&.Mui-checked': { color: colors.blue },
                            } }), label: "I agree with rules" }) }) }), _jsx(Grid, { item: true, className: "buttonBlock", children: _jsx(LoadingButtonStyled, { onClick: handleDelete, disabled: !checked, type: "submit", children: "Delete user" }) })] }));
};
export default RemoveUser;

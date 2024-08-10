import { Theme } from '@mui/material';
export interface StyledProps {
    theme: Theme;
}
export interface StyledSideBarProps extends StyledProps {
    drawerWidth: string;
}

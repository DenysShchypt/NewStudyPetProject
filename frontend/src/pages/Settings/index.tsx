import { Box, Tab, Tabs, useTheme } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { CustomTabPanel } from '../../components/TabPanel';
import a11yProps from '../../utils/helpers';
import { RootStylesSettings } from './styles';
import { tokens } from '../../theme';
import { infoUser } from '../../store/thunks/settings';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import SettingsPersonalInfoComponent from '../../components/SettingsPersonalInfo';
import ChangePasswordUser from '../../components/changePassword';
import RemoveUser from '../../components/deleteUser';

const SettingsPage: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState<number>(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode as 'light' | 'dark');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(infoUser());
  }, []);
  return (
    <RootStylesSettings theme={theme}>
      <Box className="tabsWrapper">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Settings tabs"
          centered
          textColor="secondary"
          TabIndicatorProps={{
            style: {
              backgroundColor: colors.blue,
            },
          }}
        >
          <Tab label="Personal data" {...a11yProps(0)} />
          <Tab label="Change password" {...a11yProps(1)} />
          <Tab label="Remove account" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SettingsPersonalInfoComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChangePasswordUser />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <RemoveUser />
      </CustomTabPanel>
    </RootStylesSettings>
  );
};

export default SettingsPage;

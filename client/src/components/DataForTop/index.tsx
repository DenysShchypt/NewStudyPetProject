import { FC } from 'react';
import Typography from '@mui/material/Typography';

const DateTopBar: FC = (): JSX.Element => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-GB', options);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const currentTime = new Date().toLocaleTimeString('en-GB', timeOptions).toLocaleUpperCase();
  
  return (
    <Typography variant="h6">
      {currentDate} | {currentTime}
    </Typography>
  );
};

export default DateTopBar;


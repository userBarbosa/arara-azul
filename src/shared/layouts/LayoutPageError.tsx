import { Box, Button, Typography } from '@mui/material';

interface ILayoutPageErrorProps {
  image: React.ReactNode;
  buttonText?: string;
  showButton?: boolean;
  onClickButton?: () => void;
}

export const LayoutPageError: React.FC<ILayoutPageErrorProps> = ({ 
  image, 
  buttonText,
  showButton= false,
  onClickButton,
}) => {
  return (
    <Box
      height='100%'
      width='100%'
      display= 'flex'
      justifyContent= 'center'
      alignItems= 'center'
      flexDirection= 'column'
      bgcolor={'#FFFFFF'}
    >
      <Box>
        {image}
      </Box>
      <Box paddingTop={5}>
        {showButton && (
          <Button 
            size='large'
            onClick={onClickButton}
            variant='contained'
            disableElevation
          >
            <Typography
              variant='button'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {buttonText}
            </Typography>
          </Button>)}
      </Box>
    </Box>
  );
};

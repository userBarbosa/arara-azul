import { Box, Button, Icon, Paper, Skeleton, Typography, useTheme } from '@mui/material';

interface IDetailToolsProps {
  showButtonSave?: boolean;
  showButtonSaveLoading?: boolean;
  onClickButtonSave?: () => void;

  showButtonReturn?: boolean;
  showButtonReturnLoading?: boolean;
  onClickButtonReturn?: () => void;
}

export const DetailTools: React.FC<IDetailToolsProps> = ({
  showButtonSave = false,
  showButtonSaveLoading = false,
  onClickButtonSave,

  showButtonReturn = false,
  showButtonReturnLoading = false,
  onClickButtonReturn,
}) => {

  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={2}
      padding={1}
      paddingX={1}
      display='flex'
      gap={1}
      alignItems='center'
      component={Paper}
    >
      {(showButtonReturn && !showButtonReturnLoading) && (
        <Button
          onClick={onClickButtonReturn}
          variant="contained"
          disableElevation
          fullWidth
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>arrow_back</Icon>}
        >
          <Typography
            variant='button'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            Voltar
          </Typography>
        </Button>)}

      {showButtonReturnLoading && (
        <Skeleton width={110} height={60} />
      )}
      
      {(showButtonSave && !showButtonSaveLoading) && (
        <Button
          onClick={onClickButtonSave}
          variant="contained"
          disableElevation
          fullWidth
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>save</Icon>}
        >
          <Typography
            variant='button'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            Salvar
          </Typography>
        </Button>)}

      {showButtonSaveLoading && (
        <Skeleton width={109} height={60} />
      )}
    </Box>
  );
};

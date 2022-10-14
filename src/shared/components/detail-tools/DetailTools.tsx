import { Box, Button, Icon, Paper, Skeleton, Typography, useTheme } from '@mui/material';

interface IDetailToolsProps {
  showButtonSave?: boolean;
  showButtonSaveLoading?: boolean;
  onClickButtonSave?: () => void;

  showButtonPrint?: boolean;
  showButtonPrintLoading?: boolean;
  onClickButtonPrint?: () => void;

  showButtonMedicalRecord?: boolean;
  showButtonMedicalRecordLoading?: boolean;
  onClickButtonMedicalRecord?: () => void;

  showButtonReturn?: boolean;
  showButtonReturnLoading?: boolean;
  onClickButtonReturn?: () => void;
}


export const DetailTools: React.FC<IDetailToolsProps> = ({
  showButtonSave = true,
  showButtonSaveLoading = false,
  onClickButtonSave,

  showButtonPrint = false,
  showButtonPrintLoading = false,
  onClickButtonPrint,

  showButtonMedicalRecord = false,
  showButtonMedicalRecordLoading = false,
  onClickButtonMedicalRecord,

  showButtonReturn = true,
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
      {(showButtonSave && !showButtonSaveLoading) && (
        <Button
          onClick={onClickButtonSave}
          variant="contained"
          disableElevation
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

      {(showButtonPrint && !showButtonPrintLoading) && (
        <Button
          onClick={onClickButtonPrint}
          variant="contained"
          disableElevation
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>print</Icon>}
        >
          <Typography
            variant='button'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            Imprimir
          </Typography>
        </Button>)}

      {showButtonPrintLoading && (
        <Skeleton width={118} height={60} />
      )}

      {(showButtonMedicalRecord && !showButtonMedicalRecordLoading) && (
        <Button
          onClick={onClickButtonMedicalRecord}
          variant="contained"
          disableElevation
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>library_books</Icon>}
        >
          <Typography
            variant='button'
            overflow='hidden'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
          >
            Prontuário
          </Typography>
        </Button>)}

      {showButtonMedicalRecordLoading && (
        <Skeleton width={145} height={60} />
      )}

      {(showButtonReturn && !showButtonReturnLoading) && (
        <Button
          onClick={onClickButtonReturn}
          variant="contained"
          disableElevation
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
    </Box>
  );
};

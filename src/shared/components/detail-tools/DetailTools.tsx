import { Box, Button, Icon, Paper, useTheme } from "@mui/material";

interface IDetailToolsProps {
  showButtonSave?: boolean;
  onClickButtonSave?: () => void;
  showButtonReturn?: boolean;
  onClickButtonReturn?: () => void;
  showButtonPrint?: boolean;
  onClickButtonPrint?: () => void;
  showButtonMedicalRecord?: boolean;
  onClickButtonMedicalRecord?: () => void;
}


export const DetailTools: React.FC<IDetailToolsProps> = ({
  showButtonSave = false,
  onClickButtonSave,
  showButtonReturn = true,
  onClickButtonReturn,
  showButtonPrint = false,
  onClickButtonPrint,
  showButtonMedicalRecord = false,
  onClickButtonMedicalRecord,
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
      {showButtonSave && (
        <Button
          onClick={onClickButtonSave}
          variant="contained"
          disableElevation
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>save</Icon>}
        >
          Salvar
        </Button>)}

      {showButtonPrint && (
        <Button
          onClick={onClickButtonPrint}
          variant="contained"
          disableElevation
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>print</Icon>}
        >
          Imprimir
        </Button>)}

      {showButtonMedicalRecord && (
        <Button
          onClick={onClickButtonMedicalRecord}
          variant="contained"
          disableElevation
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>library_books</Icon>}
        >
          Prontuário
        </Button>)}

      {showButtonReturn && (
        <Button
          onClick={onClickButtonReturn}
          variant="contained"
          disableElevation
          startIcon={<Icon sx={{ color: '#F7F9FC' }}>arrow_back</Icon>}
        >
          Voltar
        </Button>)}
    </Box>
  );
};

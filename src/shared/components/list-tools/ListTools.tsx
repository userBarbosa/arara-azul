import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material";

interface IListToolsProps {
  searchText?: string;
  showInputSearch?: boolean;
  onChangeSearchText?: (newText: string) => void;
  showButtonAdd?: boolean;
  onClickButtonAdd?: () => void;
}

export const ListTools: React.FC<IListToolsProps> = ({
  searchText = '',
  showInputSearch = false,
  onChangeSearchText,
  showButtonAdd = true,
  onClickButtonAdd,
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

      {showInputSearch && (
        <TextField
          value={searchText}
          onChange={(event) => onChangeSearchText?.(event.target.value)}
          label="Pesquisar"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />)}

      <Box flex={1} display='flex' justifyContent='end'>
        {showButtonAdd && (
          <Button
            onClick={onClickButtonAdd}
            variant="contained"
            disableElevation
          ><Icon
              sx={{ color: '#F7F9FC' }}>
              add
            </Icon>
          </Button>)}
      </Box>
    </Box>
  );
};

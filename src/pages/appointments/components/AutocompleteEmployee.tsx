import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';
import { EmployeesService } from '../../../shared/services/api/employees/EmployeesService';


type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface IAutocompleteEmployeeProps {
  isExternalLoading?: boolean;
}
export const AutocompleteEmployee: React.FC<IAutocompleteEmployeeProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('employeeId');
  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      EmployeesService.getAll(1, search, selectedId?.toString())
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            // alert(result.message);
          } else {
            setOptions(result.data.map(employee => ({ id: employee.id, label: employee.name })));
          }
        });
    });
  }, [search, selectedId]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, options]);


  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'

      disablePortal

      options={options}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
      renderInput={(params) => (
        <TextField
          {...params}

          label="Médico"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
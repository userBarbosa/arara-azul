import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';
import { PatientsService } from '../../../shared/services/api/patients/PatientsService';


type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface IAutocompletePatientProps {
  isExternalLoading?: boolean;
}
export const AutocompletePatient: React.FC<IAutocompletePatientProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('patientId');
  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

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
      PatientsService.getAll(getTokenCurrentUser())
        .then((result) => {
          setIsLoading(false);

          if (result === 'Network Error') {
            navigate('/400');
          } else if (result.status === 400) {
            navigate('/400');
          } else if (result.status === 401) {
            localStorage.removeItem('APP_USER');
            navigate('/401');
          } else if (result.status === 403) {
            navigate('/403');
          } else if (result.status === 404) {
            navigate('/500');
          } else if (result.status === 500) {
            navigate('/500');
          } else if (result.status === 200) {
            setOptions(result.data.map((tutor: { id: string; name: string; }) => ({ id: tutor.id, label: tutor.name })));
          }
        });
    });
  }, []);

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

          label="Paciente"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
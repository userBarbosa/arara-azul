import { useEffect, useState } from 'react';
import { Box, Grid, InputAdornment, LinearProgress, MenuItem, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { PatientsService } from '../../shared/services/api/patients/PatientsService';
import { AutoCompleteTutor } from './components/AutocompleteTutor';
import { toast } from 'react-toastify';
import { allergyNumberToString, allergyStringToNumber, formatDateToDatePicker, onTreatmentBooleanToString, onTreatmentStringToBoolean, sexNumberToString, sexStringToNumber, specieNumberToString, specieStringToNumber } from '../../shared/helpers';

interface IFormData {
  tutorId: string;
  name: string;
  bloodType: string | undefined;
  observation: string | undefined;
  species: string;
  allergy: string;
  sex: string;
  birthDate: Date;
  onTreatment: string;
  weight: number;
}

const getFormatedDate = (currentDate: string) => {
  return currentDate.split('/').reverse().join('-');
};

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  tutorId: yup.string().required(),
  name: yup.string().required(),
  bloodType: yup.string().notRequired(),
  observation: yup.string().notRequired(),
  species: yup.mixed().required().oneOf(['gato', 'cachorro', 'ave', 'peixe', 'roedor', 'reptil', 'selvagem', 'fazenda', 'marinho']).label('Selecione Uma Opção'),
  allergy: yup.mixed().required().oneOf(['alergia-pulga', 'alergia-dermatologica', 'alergia-alimentar', 'alergia-medicamento', 'outras']).label('Selecione Uma Opção'),
  sex: yup.mixed().required().oneOf(['femea', 'macho']).label('Selecione Uma Opção'),
  birthDate: yup.date().min(getFormatedDate('01/01/1900')).max(getFormatedDate(new Date().toLocaleDateString())).required(),
  onTreatment: yup.mixed().required().oneOf(['nao', 'sim']).label('Selecione Uma Opção'),
  weight: yup.number().required(),
});

export const PatientUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const getTokenCurrentUser = () => {
    const _user = localStorage.getItem('APP_USER');
  
    if (_user) {
      const obj = JSON.parse(_user);
      return obj.token;
    }
  };

  useEffect(() => {
    PatientsService.getById(id!, getTokenCurrentUser())
    .then((result) => {

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
        const data = result.data;
        formRef.current?.setData({
          tutorId: data.tutorId === undefined || data.tutorId === null ? '' : data.tutorId,
          name:  data.name === undefined || data.name === null ? '' : data.name,
          bloodType: data.bloodType === undefined || data.bloodType === null ? '' : data.bloodType,
          observation: data.observation === undefined || data.observation === null ? '' : data.observation,
          species: data.species === undefined || data.species === null ? '' : specieNumberToString(data.species),
          allergy: data.allergy === undefined || data.allergy === null ? '' : allergyNumberToString(data.allergy),
          sex: data.sex === undefined || data.sex === null ? '' : sexNumberToString(data.sex),
          birthDate: data.birthDate === undefined || data.birthDate === null ? '' : formatDateToDatePicker(data.birthDate),
          onTreatment: data.onTreatment === undefined || data.onTreatment === null ? '' : onTreatmentBooleanToString(data.onTreatment),
          weight: data.weight === undefined || data.weight === null ? '' : data.weight,
        });
      }
    });
  }, []);

  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        const data = {
          id: id!,
          tutorId: dadosValidados.tutorId,
          name: dadosValidados.name,
          bloodType: dadosValidados.bloodType,
          observation: dadosValidados.observation,
          species: specieStringToNumber(dadosValidados.species),
          allergy: allergyStringToNumber(dadosValidados.allergy),
          sex:  sexStringToNumber(dadosValidados.sex),
          birthDate: dadosValidados.birthDate,
          onTreatment: onTreatmentStringToBoolean(dadosValidados.onTreatment),
          weight: dadosValidados.weight,
        };

        PatientsService
        .updateById(id!, data, getTokenCurrentUser())
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
              navigate('/pacientes');
              toast.success('Alteração realizada com Sucesso!', {
                position: toast.POSITION.BOTTOM_CENTER
              });
            }
          });
      })
      .catch((errors: yup.ValidationError) => {
        toast.error('Informações inválidas, tente novamente!', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  return (
    <BaseLayoutPage
      title='Alterar Paciente'
      toolbar={
        <DetailTools
          showButtonSave
          showButtonReturn

          onClickButtonSave={save}
          onClickButtonReturn={() => navigate('/pacientes')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box 
          margin={2}
          component={Paper} 
          variant="outlined"
        >

          <Grid container padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <AutoCompleteTutor isExternalLoading={isLoading} />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='name'
                  name='name'
                  label='Nome'
                  disabled={isLoading}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='birthDate'
                  name='birthDate'
                  label='Data de Nascimento'
                  disabled={isLoading}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='bloodType'
                  name='bloodType'
                  label='Tipo Sanguineo'
                  disabled={isLoading}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='species'
                  name='species'
                  label='Espécie'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='gato'>Gato</MenuItem>
                  <MenuItem value='cachorro'>Cachorro</MenuItem>
                  <MenuItem value='ave'>Ave</MenuItem>
                  <MenuItem value='peixe'>Peixe</MenuItem>
                  <MenuItem value='roedor'>Roedor</MenuItem>
                  <MenuItem value='reptil'>Réptil</MenuItem>
                  <MenuItem value='selvagem'>Selvagem</MenuItem>
                  <MenuItem value='fazenda'>Fazenda</MenuItem>
                  <MenuItem value='marinho'>Marinho</MenuItem>
                </VSelect>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='sex'
                  name='sex'
                  label='Sexo'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='femea'>Fêmea</MenuItem>
                  <MenuItem value='macho'>Macho</MenuItem>
                </VSelect>
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='onTreatment'
                  name='onTreatment'
                  label='Em Tratamento'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='nao'>Não</MenuItem>
                  <MenuItem value="sim">Sim</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='allergy'
                  name='allergy'
                  label='Alergias'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='alergia-pulga'>Alergia a Pulga</MenuItem>
                  <MenuItem value='alergia-dermatologica'>Alergia Dermatológica</MenuItem>
                  <MenuItem value='alergia-alimentar'>Alergia Alimentar</MenuItem>
                  <MenuItem value='alergia-medicamento'>Alergia a Medicamentos</MenuItem>
                  <MenuItem value='outra'>Outra</MenuItem>
                </VSelect>
              </Grid>
               
            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='weight'
                  name='weight'
                  label='Peso'
                  disabled={isLoading}
                  type="number"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                  }}
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='observation'
                  name='observation'
                  label='Observação'
                  disabled={isLoading}
                />
              </Grid> 

            </Grid>

          </Grid>
        </Box>
      </VForm>
    </BaseLayoutPage>
  );
};
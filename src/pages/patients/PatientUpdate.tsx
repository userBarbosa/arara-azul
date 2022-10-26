import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { PatientsService } from '../../shared/services/api/patients/PatientsService';
import { AutoCompleteTutor } from './components/AutocompleteTutor';


interface IFormData {
  tutorId: number;
  name: string;
  birthDate: string; 
  bloodType: string;
  species: string;
  allergy: string;
  sex: string;
  treatment: string;
  observation: string | undefined;
  weight: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  tutorId: yup.number().required(),
  name: yup.string().required().min(3),
  birthDate: yup.string().required().min(3),
  bloodType: yup.string().required().min(3),
  species: yup.string().required().min(3),
  allergy: yup.string().required().min(3),
  sex: yup.string().required().min(3),
  treatment: yup.string().required().min(3),
  weight: yup.string().required().min(3),
  observation: yup.string().notRequired(),
});

export const PatientUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    formRef.current?.setData({
      tutorId: undefined,
      name: 'Maia',
      birthDate: '30/11/2020',
      bloodType: 'DEA 3',
      species: 'Cachorro',
      allergy: 'Abelha',
      sex: 'Fêmea',
      treatment: 'Não',
      weight: '8 kg',
      observation: '',
    });
  }, []);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        PatientsService
          .updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              navigate('/pacientes');
            }
          });
      })
      .catch((errors: yup.ValidationError) => {
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
                  name='birthDate'
                  label='Data de Nascimento'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
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
                  name='species'
                  label='Espécie'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='sex'
                  label='Sexo'
                  disabled={isLoading}
                />
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='treatment'
                  label='Em Tratamento'
                  disabled={isLoading}
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='allergy'
                  label='Alergias'
                  disabled={isLoading}
                />
              </Grid>
               
            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='weight'
                  label='Peso'
                  disabled={isLoading}
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
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
import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { TutorsService } from '../../shared/services/api/tutors/TutorsService';

interface IFormData {
  name: string;
  email: string;
  telephoneNumber: string;
  identificationNumber: string;
  address: string;
  patientsName: string; 
  observation: string | undefined;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().email().required(),
  telephoneNumber: yup.string().required().min(3),
  identificationNumber: yup.string().required().min(3),
  address: yup.string().required().min(3),
  patientsName: yup.string().required().min(3),
  observation: yup.string().notRequired(),
});

export const TutorUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    formRef.current?.setData({
      name: 'Kauã Claudino Loureiro',
      email: 'kaua.loureiro@gmail.com',
      telephoneNumber: '(11) 98028-7824',
      identificationNumber: '757.817.228-07',
      address: '',
      patientsName: '',
      observation: '',
    });
  }, []);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        TutorsService
          .updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              navigate('/tutores');
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
      title='Alterar Tutor'
      toolbar={
        <DetailTools
          showButtonSave
          showButtonReturn

          onClickButtonSave={save}
          onClickButtonReturn={() => navigate('/tutores')}
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
                <VTextField
                  fullWidth
                  name='name'
                  label='Nome'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='email'
                  label='E-mail'
                  disabled={isLoading}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='telephoneNumber'
                  label='Telefone'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='identificationNumber'
                  label='CPF'
                  disabled={isLoading}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  name='zipCode'
                  label='CEP'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  name='state'
                  label='Estado'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                <VTextField
                  fullWidth
                  name='city'
                  label='Cidade'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                <VTextField
                  fullWidth
                  name='neighborhood'
                  label='Bairro'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

            </Grid>


            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} >
                <VTextField
                  fullWidth
                  name='streetName'
                  label='Endereço'
                  disabled={true}
                  variant="filled"
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                <VTextField
                  fullWidth
                  name='houseNumber'
                  label='Número'
                  disabled={isLoading}
                />
              </Grid> 

              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} >
                <VTextField
                  fullWidth
                  name='complement'
                  label='Complemento'
                  disabled={isLoading}
                />
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='patientsName'
                  label='Pacientes'
                  disabled={true}
                  variant="filled"
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
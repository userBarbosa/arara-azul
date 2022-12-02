import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, MenuItem, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect, VPatternFormat } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { EmployeesService } from '../../shared/services/api/employees/EmployeesService';
import { toast } from 'react-toastify';
import { isValid as isValidCPF } from '@fnando/cpf';


interface IFormData {
  name: string;
  email: string;
  telephoneNumber: string;
  identificationNumber: string;
  birthDate: Date; 
  type: string;
  specialty: string;
  medicalLicense: string | undefined;
  status: string;
  observation: string | undefined;
}

const getFormatedDate = (currentDate: string) => {
  return currentDate.split('/').reverse().join('-');
};

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  telephoneNumber: yup.string().required(),
  identificationNumber: yup.string().required().test('test-cpf-invalido', 'CPF inválido', (identificationNumber) => isValidCPF(identificationNumber!)),
  birthDate: yup.date().min(getFormatedDate('01/01/1900')).max(getFormatedDate(new Date().toLocaleDateString())).required(),
  type: yup.mixed().required().oneOf(['administrador', 'recepcionista', 'veterinario']).label('Selecione Uma Opção'),
  specialty: yup.mixed().oneOf(['', 'gatos', 'cachorros', 'aves', 'peixes', 'roedores', 'repteis', 'selvagens', 'fazenda', 'marinhos']).label('Selecione Uma Opção'),
  medicalLicense: yup.string(),
  status: yup.mixed().required().oneOf(['ativo', 'inativo']).label('Selecione Uma Opção'),
  observation: yup.string(),
});

export const EmployeeInsert: React.FC = () => {
  const { formRef, save } = useVForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    formRef.current?.setData({
      name: '',
      email: '',
      telephoneNumber: '',
      identificationNumber: '',
      birthDate: '',
      type: '',
      specialty: '',
      medicalLicense: '',
      status: '',
      observation: '',
    });
  }, []);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
      
        EmployeesService
          .create(dadosValidados)
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              // alert(result.message);
            } else {
              navigate('/funcionarios');
              toast.success('Cadastro realizado com Sucesso!', {
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
      title='Novo Funcionário'
      toolbar={
        <DetailTools
          showButtonSave
          showButtonReturn

          onClickButtonSave={save}
          onClickButtonReturn={() => navigate('/funcionarios')}
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
                  id='nome'
                  name='name'
                  label='Nome'
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='email'
                  id='email'
                  label='E-mail'
                  disabled={isLoading}
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VPatternFormat
                  fullWidth
                  id='telefone'
                  name='telephoneNumber'
                  label='Telefone'
                  disabled={isLoading}
                  valueIsNumericString 
                  format="(##) #####-####" 
                  mask="_"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VPatternFormat
                  fullWidth
                  id='cpf'
                  name='identificationNumber'
                  label='CPF'
                  disabled={isLoading}
                  valueIsNumericString 
                  format="###.###.###-##" 
                  mask="_"
                />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='birthDate'
                  id='data-nascimento'
                  label='Data de Nascimento'
                  disabled={isLoading}
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='type'
                  id='cargo'
                  label='Cargo'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='administrador'>Administrador</MenuItem>
                  <MenuItem value="recepcionista">Recepcionista</MenuItem>
                  <MenuItem value="veterinario">Veterinário</MenuItem>
                </VSelect>
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='especialidade'
                  name='specialty'
                  label='Especialidade'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='gatos'>Gatos</MenuItem>
                  <MenuItem value='cachorros'>Cachorros</MenuItem>
                  <MenuItem value='aves'>Aves</MenuItem>
                  <MenuItem value='peixes'>Peixes</MenuItem>
                  <MenuItem value='roedores'>Roedores</MenuItem>
                  <MenuItem value='repteis'>Répteis</MenuItem>
                  <MenuItem value='selvagens'>Selvagens</MenuItem>
                  <MenuItem value='fazenda'>Fazenda</MenuItem>
                  <MenuItem value='marinhos'>Marinhos</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='crmv'
                  name='medicalLicense'
                  label='CRMV'
                  disabled={isLoading}
                />
              </Grid>
               
            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='status'
                  name='status'
                  label='Status'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value="ativo">Ativo</MenuItem>
                  <MenuItem value="inativo">Inativo</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  id='observacao'
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
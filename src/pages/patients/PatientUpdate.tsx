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

interface IFormData {
  tutorId: number;
  name: string;
  birthDate: Date; 
  bloodType: string;
  species: string;
  allergy: string;
  sex: string;
  treatment: string;
  observation: string | undefined;
  weight: number;
}

const getFormatedDate = (currentDate: string) => {
  return currentDate.split('/').reverse().join('-');
};

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  tutorId: yup.number().required(),
  name: yup.string().required(),
  birthDate: yup.date().min(getFormatedDate('01/01/1900')).max(getFormatedDate(new Date().toLocaleDateString())).required(),
  bloodType: yup.string().required(),
  species: yup.mixed().required().oneOf(['gato', 'cachorro', 'ave', 'peixe', 'roedor', 'reptil', 'selvagem', 'fazenda', 'marinho']).label('Selecione Uma Opção'),
  allergy: yup.mixed().required().oneOf(['alergia-pulga', 'alergia-dermatologica', 'alergia-alimentar', 'alergia-medicamento', 'outra']).label('Selecione Uma Opção'),
  sex: yup.mixed().required().oneOf(['femea', 'macho']).label('Selecione Uma Opção'),
  treatment: yup.mixed().required().oneOf(['nao', 'sim']).label('Selecione Uma Opção'),
  weight: yup.number().required(),
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
      birthDate: '2020-11-30',
      bloodType: 'DEA 3',
      species: 'cachorro',
      allergy: 'alergia-dermatologica',
      sex: 'femea',
      treatment: 'nao',
      weight: 8,
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
              // alert(result.message);
            } else {
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
                  id='nome'
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
                  id='data-nascimento'
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
                  id='tipo-sanguineo'
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
                  id='especie'
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
                  id='sexo'
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
                  id='em-tratamento'
                  name='treatment'
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
                  id='alergias'
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
                  id='peso'
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
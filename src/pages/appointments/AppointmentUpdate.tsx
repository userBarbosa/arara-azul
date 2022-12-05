import { useEffect, useState } from 'react';
import { Box, Grid, InputAdornment, LinearProgress, MenuItem, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { VTextField, VForm, useVForm, IVFormErrors, VSelect, VNumericFormat } from '../../shared/forms';
import { BaseLayoutPage } from '../../shared/layouts';
import { DetailTools } from '../../shared/components';
import { AutoCompleteTutor } from './components/AutocompleteTutor';
import { AppointmentsService } from '../../shared/services/api/appointments/AppointmentsService';
import { AutocompletePatient } from './components/AutocompletePatient';
import { AutocompleteEmployee } from './components/AutocompleteEmployee';
import { toast } from 'react-toastify';

interface IFormData {
  tutorId: number;
  patientId: number;
  employeeId: number;
  date: string; 
  reason: string;
  value: number;
  appointmentState: string;
  paymentMethod: string;
  observation: string | undefined;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  tutorId: yup.number().required(),
  patientId: yup.number().required(),
  employeeId: yup.number().required(),
  date: yup.string().required().min(3),
  reason: yup.mixed().required().oneOf(['emergencia', 'rotina', 'check-up', 'exame', 'cirurgia']).label('Selecione Uma Opção'),
  value: yup.number().required(),
  appointmentState: yup.mixed().required().oneOf(['rascunho', 'registrada', 'agendada', 'realizada', 'cancelada', 'paga', 'excluida']).label('Selecione Uma Opção'),
  paymentMethod: yup.mixed().required().oneOf(['cartao-credito', 'cartao-debito', 'dinheiro', 'pix']).label('Selecione Uma Opção'),
  observation: yup.string().notRequired(),
});

export const AppointmentUpdate: React.FC = () => {
  const { formRef, save } = useVForm();
  const { id } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    formRef.current?.setData({
      tutorId: 1,
      patientId: 1,
      employeeId: 1,
      date: '2022-08-20T15:30',
      reason: 'emergencia',
      value: 150.00,
      appointmentState: 'realizada',
      paymentMethod: 'pix',
      observation: '',
    });
  }, []);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        
        AppointmentsService
          .updateById(Number(id), { id: Number(id), ...dadosValidados })
          .then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              // alert(result.message);
            } else {
              navigate('/consultas');
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
      title='Alterar Consulta'
      toolbar={
        <DetailTools
          showButtonSave
          showButtonReturn

          onClickButtonSave={save}
          onClickButtonReturn={() => navigate('/consultas')}
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
                <AutoCompleteTutor isExternalLoading={isLoading}/>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <AutocompletePatient isExternalLoading={isLoading} />
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VTextField
                  fullWidth
                  name='date'
                  id='data-hora'
                  label='Data e Hora'
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  id='motivo'
                  name='reason'
                  label='Motivo'
                  disabled={isLoading}
                >
                  <MenuItem value=""><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value="emergencia">Emergência</MenuItem>
                  <MenuItem value="rotina">Rotina</MenuItem>
                  <MenuItem value="check-up">Check-Up</MenuItem>
                  <MenuItem value="exame">Exame</MenuItem>
                  <MenuItem value="cirurgia">Cirurgia</MenuItem>
                </VSelect>
              </Grid>

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <AutocompleteEmployee isExternalLoading={isLoading} />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VNumericFormat
                  fullWidth
                  name='value'
                  label='Valor'
                  id='valor'
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                  valueIsNumericString
                  decimalSeparator=","
                  thousandSeparator="."
                  decimalScale={2}
                  thousandsGroupStyle="thousand"
                  allowNegative={false}
                  allowLeadingZeros={true}
                  onValueChange={(values) => {
                    console.log(values);
                  }}
                />
              </Grid> 

            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='paymentMethod'
                  label='Pagamento'
                  disabled={isLoading}
                  id='pagamento'
                >
                  <MenuItem value=''><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='cartao-credito'>Cartão de Crédito</MenuItem>
                  <MenuItem value='cartao-debito'>Cartão de Débito</MenuItem>
                  <MenuItem value='dinheiro'>Dinheiro</MenuItem>
                  <MenuItem value='pix'>PIX</MenuItem>
                </VSelect>
              </Grid> 

              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                <VSelect
                  fullWidth
                  name='appointmentState'
                  label='Status'
                  disabled={isLoading}
                  id='status'
                >
                  <MenuItem value=''><em>Selecione Uma Opção</em></MenuItem>
                  <MenuItem value='rascunho'>Rascunho</MenuItem>
                  <MenuItem value='registrada'>Registrada</MenuItem>
                  <MenuItem value='agendada'>Agendada</MenuItem>
                  <MenuItem value='realizada'>Realizada</MenuItem>
                  <MenuItem value='cancelada'>Cancelada</MenuItem>
                  <MenuItem value='paga'>Paga</MenuItem>
                  <MenuItem value='excluida'>Excluída</MenuItem>
                </VSelect>
              </Grid>
               
            </Grid>

            <Grid container item direction="row" spacing={2}>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <VTextField
                  fullWidth
                  name='observation'
                  label='Observação'
                  disabled={isLoading}
                  id='observacao'
                />
              </Grid> 

            </Grid>

          </Grid>
        </Box>
      </VForm>
    </BaseLayoutPage>
  );
};
import Slider from './slider/index';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './styles.css';

const SliderProps = {
  zoomFactor: 30,
  slideMargin: 10, 
  maxVisibleSlides: 5,
  pageTransition: 500
};

// Types
export type Appointment = {
  id: string;
  patiend: string;
  tutor: string;
  employee: string;
  appointmentState: string;
  value: number;
  date: Date;
};

export const SliderCard: React.FC = () => {
  const [data, setData] = useState<Appointment[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await (
        await fetch('https://finalspaceapi.com/api/v0/character/')
      ).json();
      setData(data);
    };

    getData();
  }, []);

  if (data.length < 1) return <div>Loading ...</div>;

  return (
    <>
      <Slider {...SliderProps}>
        {data.map(appointment => (
          <Box key={appointment.id} borderRadius={5} bgcolor={'background.paper'}>
            <Box bgcolor={'#E8F9FC'} margin={2} padding={1} borderRadius={5} maxHeight={200}>
              <img className='random-image' src={require('../../../assets/card-images/image-' + [Math.floor(Math.random() * (54 - 1 + 1) + 1)] + '.svg')} alt='appointment' />
            </Box>
            <Box margin={2} padding={1}>
              <Box display='flex' alignItems='center' justifyContent='space-between' flexDirection={'row'}>
                <Typography variant='subtitle2' sx={{ color: '#006BBF' }}>
                  20/08/2022 09:00
                </Typography>
                <Typography variant='h3' sx={{ color: '#006BBF' }}>
                  #1
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Médico: 
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                  Ignácio Faria Theodoro
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Paciente:
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                  Floquinho
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Tutor: 
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                  Oliver Fausto Marcello
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Valor:
                </Typography>
                <Typography variant='h4' sx={{ color: '#00569C' }}>
                  R$ 150,00
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' flexDirection={'row'} marginTop={1}>
                <Typography variant='body2' sx={{ color: '#006BBF', fontWeight: 600, marginRight: 2 }}>
                  Status:
                </Typography>
                <Typography variant='body2' sx={{ color: '#00569C' }}>
                  Agendada
                </Typography>
              </Box>

            </Box>
          </Box>
        ))}
      </Slider>
    </>
  );
};

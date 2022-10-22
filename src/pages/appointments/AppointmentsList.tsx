import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const AppointmentsList: React.FC = () => {
  return (
    <BaseLayoutPage
      title={'Consultas'}
      toolbar={(
        <DetailTools />
      )}
    >
      Testando Consulta
    </BaseLayoutPage>
  );
};
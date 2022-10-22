import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const PatientsList: React.FC = () => {
  return (
    <BaseLayoutPage
      title={'Pacientes'}
      toolbar={(
        <DetailTools />
      )}
    >
      Testando Consulta
    </BaseLayoutPage>
  );
};
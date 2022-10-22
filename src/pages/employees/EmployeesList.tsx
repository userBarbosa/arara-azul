import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const EmployeesList: React.FC = () => {
  return (
    <BaseLayoutPage
      title={'Funcionários'}
      toolbar={(
        <DetailTools />
      )}
    >
      Testando Funcionários
    </BaseLayoutPage>
  );
};
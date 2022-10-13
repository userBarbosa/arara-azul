import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const Dashboard: React.FC = () => {
  return (
    <BaseLayoutPage
      title={'Dashboard'}
      toolbar={(
        <DetailTools />
      )}
    >
      Testando
    </BaseLayoutPage>
  );
};

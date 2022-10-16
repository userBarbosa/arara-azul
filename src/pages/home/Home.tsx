import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const Home: React.FC = () => {
  return (
    <BaseLayoutPage
      title={'Home'}
      toolbar={(
        <DetailTools />
      )}
    >
      Testando
    </BaseLayoutPage>
  );
};

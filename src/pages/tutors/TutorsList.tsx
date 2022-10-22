import { DetailTools } from '../../shared/components';
import { BaseLayoutPage } from '../../shared/layouts';

export const TutorsList: React.FC = () => {
  return (
    <BaseLayoutPage
      title={'Tutores'}
      toolbar={(
        <DetailTools />
      )}
    >
      Testando Tutor
    </BaseLayoutPage>
  );
};
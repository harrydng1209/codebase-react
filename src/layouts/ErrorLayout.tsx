import { BaseButton } from '@/components/shared/BaseButton';
import { HOME } from '@/constants/route-pages.const';

export const ErrorLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tw-fixed-center tw-flex-center tw-flex-col">
      <h4 className="tw-mb-4">This screen does not exist</h4>
      <BaseButton onClick={() => navigate(HOME)}>Go to home screen</BaseButton>
    </div>
  );
};

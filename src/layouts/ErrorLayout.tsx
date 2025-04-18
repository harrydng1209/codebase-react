import { BaseButton } from '@/components/shared/BaseButton';
import { HOME } from '@/constants/route-pages.const';

export const ErrorLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="tw-flex-center tw-min-h-screen tw-bg-gray-50 tw-px-4">
      <div className="tw-max-w-md tw-rounded-2xl tw-border tw-border-gray-200 tw-bg-white tw-p-8 tw-shadow-md">
        <div className="tw-text-center">
          <svg
            className="tw-mx-auto tw-mb-4 tw-h-12 tw-w-12 tw-text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 9v3.75m0 3.75h.007M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="tw-mb-2 tw-text-xl tw-font-semibold tw-text-gray-800">
            Something went wrong
          </p>

          <p className="tw-mb-6 tw-text-gray-500">
            We’re sorry for the inconvenience. Please try again or go back.
          </p>

          <div className="tw-flex-center tw-gap-3">
            <BaseButton onClick={() => window.location.reload()}>
              Try again
            </BaseButton>

            <BaseButton onClick={() => navigate(HOME)} type="default">
              Go back
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

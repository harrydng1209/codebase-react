import { login } from '@/apis/auth.api';
import IconEye from '@/assets/icons/modules/auth/IconEye.svg?react';
import IconEyeClosed from '@/assets/icons/modules/auth/IconEyeClosed.svg?react';
import IconRequired from '@/assets/icons/shared/IconRequired.svg?react';
import styles from '@/assets/styles/components/auth/login.module.scss';
import { BaseButton } from '@/components/shared/BaseButton';
import { BaseInput } from '@/components/shared/BaseInput';
import { AUTH_PAGES, HOME } from '@/constants/route-pages.const';
import { REGEXES, SELECTORS } from '@/constants/shared.const';
import { ILoginRequest } from '@/models/interfaces/auth.interface';
import { useAuthStore } from '@/stores/auth.store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { Link } from 'react-router';
import { object as yupObject, string as yupString } from 'yup';

export const Login: React.FC = () => {
  const schema = yupObject({
    email: yupString()
      .required('Email is required')
      .matches(REGEXES.EMAIL, 'Invalid email format'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
  });
  const { control, handleSubmit } = useForm<ILoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();
  const authStore = useAuthStore();
  const navigate = useNavigate();
  const { handleCatchError } = useHandleCatchError();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ILoginRequest> = async (values) => {
    try {
      const response = await login(values);
      authStore.setToken(response.data.accessToken);
      await navigate(HOME);
    } catch (error) {
      handleCatchError(error);
    }
  };

  const renderIcon = (onClick: () => void) => {
    const IconComponent = showPassword ? IconEye : IconEyeClosed;
    return <IconComponent height="22" onClick={onClick} width="22" />;
  };

  return (
    <div className={styles['container']}>
      <section id={SELECTORS.LOGIN_SECTION}>
        <h4>{t('auth.login')}</h4>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.email')}</span>
                <IconRequired className="tw-ml-1" height="10" width="5" />
              </>
            }
            name="email"
          >
            <BaseInput placeholder="name@email.com" type="text" />
          </FormItem>

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.password')}</span>
                <IconRequired className="tw-ml-1" height="10" width="5" />
              </>
            }
            name="password"
          >
            <BaseInput
              placeholder={t('auth.inputPassword')}
              suffix={renderIcon(togglePasswordVisibility)}
              type={showPassword ? 'text' : 'password'}
            />
          </FormItem>

          <BaseButton className="tw-w-full tw-mt-2" htmlType="submit">
            {t('auth.login')}
          </BaseButton>
        </Form>

        <div className={styles['container__register-now']}>
          <p>{t('auth.noAccount')}</p>
          <Link to={AUTH_PAGES.REGISTER}>{t('auth.registerNow')}</Link>
        </div>
      </section>
    </div>
  );
};

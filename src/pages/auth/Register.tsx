import { register } from '@/apis/auth.api';
import IconEye from '@/assets/icons/modules/auth/IconEye.svg?react';
import IconEyeClosed from '@/assets/icons/modules/auth/IconEyeClosed.svg?react';
import IconRequired from '@/assets/icons/shared/IconRequired.svg?react';
import styles from '@/assets/styles/components/auth/register.module.scss';
import { BaseButton } from '@/components/shared/BaseButton';
import { BaseInput } from '@/components/shared/BaseInput';
import { AUTH_PAGES } from '@/constants/route-pages.const';
import { REGEXES, SELECTORS } from '@/constants/shared.const';
import { useHandleCatchError } from '@/hooks/shared/use-handle-catch-error';
import { IRegister } from '@/models/interfaces/auth.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { Link } from 'react-router';
import { object as yupObject, ref as yupRef, string as yupString } from 'yup';

export const Register: React.FC = () => {
  const schema = yupObject({
    displayName: yupString()
      .required('Display name is required')
      .matches(
        REGEXES.DISPLAY_NAME,
        'Name can only contain letters and spaces',
      ),
    email: yupString()
      .required('Email is required')
      .matches(REGEXES.EMAIL, 'Invalid email format'),
    password: yupString()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    passwordConfirm: yupString()
      .required('Confirm password is required')
      .oneOf([yupRef('password')], 'Passwords must match'),
    username: yupString()
      .required('Username is required')
      .matches(
        REGEXES.USERNAME,
        'Username can only contain letters and numbers',
      ),
  });
  const { control, handleSubmit, setError } = useForm<IRegister>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleCatchError } = useHandleCatchError();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const onSubmit: SubmitHandler<IRegister> = async (values) => {
    try {
      await register(values);
      await navigate(AUTH_PAGES.LOGIN);
    } catch (error) {
      const errorData = handleCatchError<{ fields: (keyof IRegister)[] }>(
        error,
      );
      if (errorData?.fields)
        errorData.fields.forEach((field) => {
          setError(field, {
            message: `${field} is already taken`,
            type: 'manual',
          });
        });
    }
  };

  const renderIcon = (onClick: () => void) => {
    const IconComponent = showPassword ? IconEye : IconEyeClosed;
    return <IconComponent height="22" onClick={onClick} width="22" />;
  };

  return (
    <div className={styles['container']}>
      <section id={SELECTORS.REGISTER_SECTION}>
        <h4>{t('auth.register')}</h4>

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
            <BaseInput placeholder="name@email.com" />
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

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.passwordConfirm')}</span>
                <IconRequired className="tw-ml-1" height="10" width="5" />
              </>
            }
            name="passwordConfirm"
          >
            <BaseInput
              placeholder={t('auth.inputPassword')}
              suffix={renderIcon(togglePasswordConfirmVisibility)}
              type={showPassword ? 'text' : 'password'}
            />
          </FormItem>

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.username')}</span>
                <IconRequired className="tw-ml-1" height="10" width="5" />
              </>
            }
            name="username"
          >
            <BaseInput placeholder={t('auth.enterYourUsername')} />
          </FormItem>

          <FormItem
            control={control}
            label={
              <>
                <span>{t('auth.displayName')}</span>
                <IconRequired className="tw-ml-1" height="10" width="5" />
              </>
            }
            name="displayName"
          >
            <BaseInput placeholder={t('auth.enterYourDisplayName')} />
          </FormItem>

          <BaseButton className="tw-w-full tw-mt-2" htmlType="submit">
            {t('auth.register')}
          </BaseButton>
        </Form>

        <div className={styles['container__login-now']}>
          <p>{t('auth.hasAccount')}</p>
          <Link to={AUTH_PAGES.LOGIN}>{t('auth.loginNow')}</Link>
        </div>
      </section>
    </div>
  );
};

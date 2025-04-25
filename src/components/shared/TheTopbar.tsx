import IconDarkMode from '@/assets/icons/shared/IconDarkMode.svg?react';
import IconEnglish from '@/assets/icons/shared/IconEnglish.svg?react';
import IconJapanese from '@/assets/icons/shared/IconJapanese.svg?react';
import IconLightMode from '@/assets/icons/shared/IconLightMode.svg?react';
import IconNotification from '@/assets/icons/shared/IconNotification.svg?react';
import IconVietnamese from '@/assets/icons/shared/IconVietnamese.svg?react';
import styles from '@/assets/styles/components/the-topbar.module.scss';
import { BaseDropdown } from '@/components/shared/BaseDropdown';
import { TheBreadcrumb } from '@/components/shared/TheBreadcrumb';
import { AUTH_PAGES } from '@/constants/route-pages.const';
import { useLanguage } from '@/hooks/shared/use-language';
import { useTheme } from '@/hooks/shared/use-theme';
import { useThemeColor } from '@/hooks/shared/use-theme-color';
import { notifications } from '@/mocks/the-topbar.mock';
import { ELanguageCode } from '@/models/enums/shared.enum';
import { useAuthStore } from '@/stores/auth.store';
import { Avatar, Badge, MenuProps } from 'antd';
import { useNavigate } from 'react-router';

export const TheTopbar: React.FC = () => {
  const { changeTheme, isDark } = useTheme();
  const { language, setLanguage } = useLanguage();
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { getThemeColor } = useThemeColor();

  const i18nOptions = Object.entries(ELanguageCode).map(([key, value]) => ({
    label: key,
    value,
  }));

  const notificationMenu: MenuProps = {
    items: [
      ...notifications.map((notification) => ({
        key: notification.id,
        label: (
          <div>
            <p>{notification.message}</p>
            <p>{notification.time}</p>
          </div>
        ),
      })),
      {
        key: 'clear-all',
        label: <p>Clear All</p>,
      },
    ],
  };

  const getIconPathForLanguage = (lang: ELanguageCode) => {
    const iconPaths = {
      [ELanguageCode.English]: <IconEnglish />,
      [ELanguageCode.Japanese]: <IconJapanese />,
      [ELanguageCode.Vietnamese]: <IconVietnamese />,
    };
    return iconPaths[lang];
  };

  const languageMenu: MenuProps = {
    items: i18nOptions.map((item) => ({
      key: item.value,
      label: (
        <div style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
          {getIconPathForLanguage(item.value)}
          <p>{item.label}</p>
        </div>
      ),
      onClick: () => setLanguage(item.value),
    })),
  };

  const handleLogout = async () => {
    logout();
    await navigate(AUTH_PAGES.LOGIN);
  };

  const renderIcon = () => {
    const IconComponent = isDark ? IconLightMode : IconDarkMode;
    return (
      <IconComponent fill={getThemeColor('ICON_SVG')} onClick={changeTheme} />
    );
  };

  return (
    <div className={styles['container']}>
      <section className="tw-flex-center">
        <TheBreadcrumb />
      </section>

      <section className={styles['container__menu']}>
        {renderIcon()}

        <BaseDropdown menu={languageMenu}>
          <span>{getIconPathForLanguage(language)}</span>
        </BaseDropdown>

        <BaseDropdown menu={notificationMenu}>
          <Badge count={notifications.length}>
            <IconNotification fill={getThemeColor('ICON_SVG')} />
          </Badge>
        </BaseDropdown>

        <BaseDropdown
          menu={{
            items: [
              { key: 'profile', label: 'Profile' },
              { key: 'settings', label: 'Settings' },
              { type: 'divider' },
              { key: 'logout', label: 'Logout', onClick: () => handleLogout() },
            ],
          }}
        >
          <Avatar className="tw-cursor-pointer">H</Avatar>
        </BaseDropdown>
      </section>
    </div>
  );
};

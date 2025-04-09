import IconDashboard from '@/assets/icons/shared/IconDashboard.svg?react';
import IconFolderShared from '@/assets/icons/shared/IconFolderShared.svg?react';
import IconLogo from '@/assets/icons/shared/IconLogo.svg?react';
import IconSettings from '@/assets/icons/shared/IconSettings.svg?react';
import styles from '@/assets/styles/components/the-sidebar.module.scss';
import { CODEBASE, HOME } from '@/constants/route-pages.const';
import { AUTH_PAGES } from '@/constants/route-pages.const';
import { useTheme } from '@/hooks/shared/use-theme';
import { useThemeColor } from '@/hooks/shared/use-theme-color';
import { Menu } from 'antd';
import { Link } from 'react-router';

export const TheSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { getThemeColor } = useThemeColor();

  const menuItems = [
    {
      icon: <IconDashboard fill={getThemeColor('ICON_SVG')} />,
      key: AUTH_PAGES.LOGIN,
      label: t('shared.navigator.login'),
    },
    {
      icon: <IconSettings fill={getThemeColor('ICON_SVG')} />,
      key: AUTH_PAGES.REGISTER,
      label: t('shared.navigator.register'),
    },
    {
      icon: <IconFolderShared fill={getThemeColor('ICON_SVG')} />,
      key: CODEBASE,
      label: t('shared.navigator.codebase'),
    },
  ];
  const selectedKey =
    menuItems.find((item) => item.key === location.pathname)?.key || '';

  return (
    <div className={styles['container']}>
      <div className={styles['container__logo']}>
        <Link to={HOME}>
          <IconLogo />
        </Link>
      </div>

      <Menu
        items={menuItems.map((item) => ({
          icon: item.icon,
          key: item.key,
          label: item.label,
        }))}
        mode="inline"
        onClick={({ key }) => navigate(key)}
        selectedKeys={[selectedKey]}
        theme={isDark ? 'dark' : 'light'}
      />
    </div>
  );
};

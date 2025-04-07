import { DEFAULT } from '@/constants/theme-colors.const';
import { useTheme } from '@/hooks/shared/use-theme';
import { useThemeColor } from '@/hooks/shared/use-theme-color';
import {
  theme as antTheme,
  ConfigProvider,
  ConfigProviderProps,
  type ThemeConfig,
} from 'antd';
import { App as AntApp } from 'antd';
import enUS from 'antd/locale/en_US';

interface IProps extends React.PropsWithChildren {}
type TLocale = ConfigProviderProps['locale'];

export const AntConfigProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  const { isDark } = useTheme();
  const { getThemeColor } = useThemeColor();
  const [locale, _setLocale] = useState<TLocale>(enUS);

  const config: ThemeConfig = {
    algorithm: isDark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    components: {
      Button: {
        primaryShadow: '',
      },
      Layout: {
        headerHeight: '75px',
      },
      Menu: {
        darkItemBg: '#111c2d',
      },
      Table: {
        borderColor: getThemeColor('BORDER'),
      },
    },
    cssVar: false,
    hashed: false,
    token: {
      colorBgContainer: getThemeColor('BACKGROUND_CONTAINER'),
      colorBgElevated: getThemeColor('BACKGROUND_ELEVATED'),
      colorBorder: getThemeColor('BORDER'),
      colorPrimary: DEFAULT.PRIMARY,
      colorText: getThemeColor('TEXT'),
      colorTextPlaceholder: getThemeColor('TEXT_PLACEHOLDER'),
    },
  };

  return (
    <ConfigProvider locale={locale} theme={config}>
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
};

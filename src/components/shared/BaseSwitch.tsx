import { Switch, SwitchProps } from 'antd';

interface IProps extends SwitchProps {}

export const BaseSwitch: React.FC<IProps> = ({ ...otherProps }) => {
  return <Switch {...otherProps} />;
};

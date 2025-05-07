import { TimePicker, TimePickerProps } from 'antd';

interface IProps extends TimePickerProps {}

export const BaseTimePicker: React.FC<IProps> = ({ ...otherProps }) => {
  return <TimePicker {...otherProps} />;
};

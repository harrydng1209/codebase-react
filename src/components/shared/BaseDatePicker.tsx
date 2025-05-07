import { DatePicker, DatePickerProps } from 'antd';

interface IProps extends DatePickerProps {}

export const BaseDatePicker: React.FC<IProps> = ({ ...otherProps }) => {
  return <DatePicker {...otherProps} />;
};

export const BaseMonthPicker: React.FC<IProps> = ({ ...otherProps }) => {
  return <DatePicker.MonthPicker {...otherProps} />;
};

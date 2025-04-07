import { DatePicker, DatePickerProps } from 'antd';

interface IProps extends DatePickerProps {}

export const BaseDatePicker: React.FC<IProps> = (props) => {
  const { ...otherProps } = props;

  return <DatePicker {...otherProps} />;
};

export const BaseMonthPicker: React.FC<IProps> = (props) => {
  const { ...otherProps } = props;

  return <DatePicker.MonthPicker {...otherProps} />;
};

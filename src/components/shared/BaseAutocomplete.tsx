import { AutoComplete, AutoCompleteProps } from 'antd';

interface IProps extends AutoCompleteProps {}

export const BaseAutocomplete: React.FC<IProps> = ({ ...otherProps }) => {
  return <AutoComplete {...otherProps} />;
};

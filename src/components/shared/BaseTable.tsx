import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';

interface IProps<T> extends TableProps<T> {
  columns: ColumnType<T>[];
}

export const BaseTable = <T,>(props: IProps<T>) => {
  const { ...otherProps } = props;

  return <Table<T> {...otherProps} />;
};

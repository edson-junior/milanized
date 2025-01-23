import { TablePreview, TableRow } from '@sanity/table';
import { PreviewProps } from 'sanity';

interface Table {
  rows?: TableRow[];
  title?: string;
}

interface TableValueProps {
  table?: Table;
  caption?: string;
}

export function TableWidget(props: TableValueProps & PreviewProps) {
  const { table, caption, ...rest } = props;
  const tablePreviewProps = {
    ...rest,
    rows: table?.rows || [],
    title: caption ?? 'Untitled Table'
  };

  return <TablePreview {...tablePreviewProps} />;
}

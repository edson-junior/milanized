import { TableValueProps } from './BlockRenderClient';

export default function Table({ value }: { value: TableValueProps }) {
  const { caption, table } = value;
  const tableContent = table?.rows;

  if (!tableContent || tableContent.length < 1) {
    return <p>Table Data Missing</p>;
  }

  const [tableHeading, ...tableBody] = tableContent.map((t) => t.cells);

  if (!tableHeading || tableBody.length < 1) {
    return <p>Table Data must have at least one cell.</p>;
  }

  return (
    <div className="w-full overflow-auto">
      <table className="border border-zinc-200 w-full text-base my-4">
        {caption && (
          <caption className="font-incognito font-medium my-1">
            {caption}
          </caption>
        )}
        <thead className="bg-zinc-50 border-b border-zinc-200 text-left">
          <tr className="divide-x divide-zinc-200">
            {tableHeading.map((heading) => (
              <th key={heading} scope="col" className="px-3 py-2">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row, index) => (
            <tr
              key={index}
              className="divide-x divide-zinc-200 border border-zinc-200"
            >
              {row.map((cell) => (
                <td key={cell} className="px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

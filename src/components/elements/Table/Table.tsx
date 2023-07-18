import classNames from "classnames"

interface TableProps {
  columns: Array<string>
  rows: Array<Array<string>>
}

const Table: React.FC<TableProps> = ({ columns, rows}) => {
  return (
    <table className="w-full">
      <tr className="border-b">
        {columns.map((column, idx) => (
          <td key={idx} className={classNames("px-5 py-2",
            { "bg-primary-950 text-white": idx % 2 === 0},
            { "bg-secondary-50 ": idx % 2 === 1}
          )}>
            {column}          
          </td>
        ))}
      </tr>
      {rows.map((row, id) => (
        <tr key={id} className="border-b">
          {row.map((item, idx) => (
            <td key={idx} className="px-5 py-1">{item}</td>
          ))}
        </tr>
      ))}
    </table>
  )
}

export default Table
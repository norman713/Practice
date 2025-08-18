import React from "react";

interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "checkbox" | "custom";
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  selectedIds?: string[];
  isCheckbox?: boolean;
  pageSize?: number;
  totalItems?: number;
  currentPage?: number;
  columns?: Column[];
  data?: any[];
  onPaging: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSelectAll: () => void;
  onSelectRow: (id: string) => void;
}

function Table({
  selectedIds = [],
  isCheckbox = false,
  pageSize = 10,
  totalItems = 0,
  currentPage = 1,
  columns = [],
  data = [],
  onPaging,
  onPageSizeChange,
  onSelectAll,
  onSelectRow,
}: TableProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className=" w-full">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-violet-400">
            {isCheckbox && (
              <th>
                <input
                  type="checkbox"
                  checked={
                    data.length > 0 &&
                    data.every((row) => selectedIds.includes(row.id))
                  }
                  onChange={onSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className="p-2 border text-center">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (isCheckbox ? 1 : 0)}
                className="p-4 text-center"
              >
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-violet-300">
                {isCheckbox && (
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => onSelectRow(row.id)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2 border text-center">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2">Hiển thị:</label>
          <select
            className="border px-2 py-1 bg-zinc-600"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-zinc-600"
              }`}
              onClick={() => onPaging(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;

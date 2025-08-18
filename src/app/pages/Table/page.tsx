"use client";
import Table from "@/components/Table";
import { useState } from "react";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Tên" },
  { key: "email", label: "Email" },
];

const data = [
  { id: "1", name: "Nguyễn Văn A", email: "a@gmail.com" },
  { id: "2", name: "Trần Thị B", email: "b@gmail.com" },
  { id: "3", name: "Lê Văn C", email: "c@gmail.com" },
  { id: "4", name: "Lê Văn C", email: "d@gmail.com" },
  { id: "5", name: "Lê Văn C", email: "c@gmail.com" },
  { id: "6", name: "Lê Văn C", email: "c@gmail.com" },
];

export default function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <Table
      columns={columns}
      data={paginatedData}
      isCheckbox={true}
      selectedIds={selectedIds}
      totalItems={data.length}
      currentPage={currentPage}
      pageSize={pageSize}
      onPaging={(page) => setCurrentPage(page)}
      onPageSizeChange={(size) => setPageSize(size)}
      onSelectAll={() => {
        if (selectedIds.length === data.length) {
          setSelectedIds([]);
        } else {
          setSelectedIds(data.map((row) => row.id));
        }
      }}
      onSelectRow={(id) => {
        if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
          setSelectedIds([...selectedIds, id]);
        }
      }}
    />
  );
}

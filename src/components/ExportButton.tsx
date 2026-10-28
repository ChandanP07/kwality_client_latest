'use client';

import React from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExportButtonProps {
  data: any[];
  fileName: string;
  buttonText?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  fileName,
  buttonText = 'Export to Excel',
}) => {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
    >
      <Download className="h-4 w-4" />
      {buttonText}
    </button>
  );
};
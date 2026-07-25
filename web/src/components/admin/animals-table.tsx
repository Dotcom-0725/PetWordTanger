"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { Animal } from "@/types/animal";

const STATUS_VARIANT: Record<Animal["availabilityStatus"], "default" | "secondary" | "outline"> = {
  available: "default",
  reserved: "secondary",
  sold: "outline",
};

const columns: ColumnDef<Animal>[] = [
  { accessorKey: "sku", header: "SKU" },
  {
    accessorKey: "commonName",
    header: "Nom",
    cell: ({ row }) => row.original.commonName.fr,
  },
  { accessorKey: "species", header: "Espèce" },
  { accessorKey: "breed", header: "Race" },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <button className="flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Prix <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: ({ row }) => formatCurrency(row.original.price, "fr"),
  },
  { accessorKey: "quantityAvailable", header: "Stock" },
  {
    accessorKey: "availabilityStatus",
    header: "Statut",
    cell: ({ row }) => <Badge variant={STATUS_VARIANT[row.original.availabilityStatus]}>{row.original.availabilityStatus}</Badge>,
  },
];

export function AnimalsTable({ data }: { data: Animal[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm">+ Ajouter un animal</Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

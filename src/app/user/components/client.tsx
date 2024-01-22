"use client";
import React, { useEffect, useState, useCallback, Key } from "react";
import {
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { columns } from "./lib/data";

interface clientProps {
  email: string;
}

export default function Client({ email }: clientProps) {
  const [client, setClient] = useState<string[][]>();

  useEffect(() => {
    fetch(`/api/client?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setClient(data["document"]["purchases"]);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [email]);

  const renderCell = useCallback((rowValue: string[], columnKey: Key) => {
    switch (columnKey) {
      case "date":
        return rowValue[2];
      case "time":
        return rowValue[3];
      case "subject":
        return <Chip className="p-1 m-1 text-md capitalize">{rowValue[1]}</Chip>;
      case "description":
        return rowValue[4];
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <>
        {client && (
          <Table aria-label="Purchase History" className="mx-auto my-5 w-5/6">
            <TableHeader columns={columns}>
              {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
            </TableHeader>
            <TableBody emptyContent="No purchases found!" items={client}>
              {(item) => (
                <TableRow key={item[2]}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </>
    </div>
  );
}

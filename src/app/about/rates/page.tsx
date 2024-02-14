"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Divider,
  Button,
  Link,
} from "@nextui-org/react";

export default function App() {
  return (
    <div className="h-dvh">
      <h1 className="mx-auto my-4 w-10/12 md:w-2/3 text-xl">
        STEMpire focuses on being very affordable while still offering the
        highest quality of education
      </h1>
      <Divider />
      <Table isStriped className="mx-auto mt-3 w-11/12 md:w-1/2" aria-label="Rates table">
        <TableHeader>
          <TableColumn># of Students in session</TableColumn>
          <TableColumn>Cost (per person)</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>1 student</TableCell>
            <TableCell>$50/hr</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>2-4 students</TableCell>
            <TableCell>$40/hr</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>5-7 students</TableCell>
            <TableCell>$35/hr</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>8+ students</TableCell>
            <TableCell>$30/hr</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="text-sm text-slate-900 italic md:hidden mx-auto w-3/4 md:w-1/2 pt-2 pl-1">
        * On devices with smaller screens you may have to scroll to view the
        entire table
      </p>
      <p className="mx-auto text-slate-700 w-3/4 md:w-1/2">
        * Note that prices are subject to processing fees
      </p>
      <div className="mx-auto w-1/2">
        <Link href="/book">
          <Button className="mt-5 md:mt-3" color="success">
            Book your session now!
          </Button>
        </Link>
      </div>
    </div>
  );
}

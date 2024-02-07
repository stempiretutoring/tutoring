"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Snippet } from "@nextui-org/react";

export default function App() {
  return (
    <div className="h-dvh w-screen">
      <div className="flex justify-center align-items">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      </div>
      <div className="flex justify-center mt-5">
        <ol className="list-decimal w-9/12">
          <li>
            <p className="text-xl underline">How are sessions conducted?</p>
            <ul className="list-disc">
              <li className="text-base">
                Sessions can be either online or in person, depending on your
                preference!
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">What subjects are offered?</p>
            <ul className="list-disc">
              <li className="text-base">
                Each STEMpire tutor is extremely well versed in all level of
                mathematics up to calculus 1! Besides that each tutor focuses on
                different areas and levels of STEM subjects. You can find the
                full list below:
                <div className="m-3 w-full md:w-7/12">
                  <Table aria-label="Subjects table">
                    <TableHeader>
                      <TableColumn>SUBJECT</TableColumn>
                      <TableColumn>AP/IB EQUIVALENT</TableColumn>
                    </TableHeader>
                    <TableBody>
                      <TableRow key="1">
                        <TableCell>Pre-Algebra (and below)</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                      <TableRow key="2">
                        <TableCell>Algebra 1</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                      <TableRow key="3">
                        <TableCell>Geometry</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                      <TableRow key="4">
                        <TableCell>Algebra 2</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                      <TableRow key="5">
                        <TableCell>Pre-Calculus</TableCell>
                        <TableCell>AP Pre-Calculus</TableCell>
                      </TableRow>
                      <TableRow key="6">
                        <TableCell>Calculus 1</TableCell>
                        <TableCell>AP AB/BC Calculus</TableCell>
                      </TableRow>
                      <TableRow key="7">
                        <TableCell>Calculus 2</TableCell>
                        <TableCell>AP BC Calculus</TableCell>
                      </TableRow>
                      <TableRow key="8">
                        <TableCell>Calculus 3</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                      <TableRow key="9">
                        <TableCell>Differential Equations</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                      <TableRow key="10">
                        <TableCell>Real Analysis</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                      <TableRow key="11">
                        <TableCell>Physics 1</TableCell>
                        <TableCell>AP/IB Physics 1</TableCell>
                      </TableRow>
                      <TableRow key="12">
                        <TableCell>Physics: Mechanics</TableCell>
                        <TableCell>AP Physics C: Mechanics</TableCell>
                      </TableRow>
                      <TableRow key="13">
                        <TableCell>Physics: Electricity and Magnetism</TableCell>
                        <TableCell>AP Physics C: Electricity and Magnetic</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-sm italic md:hidden pt-2 pl-1">* On devices with smaller screens you may have to scroll to view the entire table</p>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">Questions? Comments? Concerns?</p>
            <ul className="list-disc">
              <li className="text-base mt-2">
                We&#39;d love to hear from you! Reach out to us:{" "}
                <Snippet symbol='' variant="flat">support@stempiretutoring.com</Snippet>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}

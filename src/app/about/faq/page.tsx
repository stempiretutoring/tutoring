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
        <h1 className="text-2xl font-bold underline">Frequently Asked Questions</h1>
      </div>
      <div className="flex justify-center mt-5 mb-5">
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
                mathematics up to Calculus 1! Besides that, each tutor focuses
                on different areas and levels of STEM subjects. You can find the
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
                      <TableRow key="14">
                        <TableCell>Linear Algebra</TableCell>
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
                        <TableCell>
                          Physics: Electricity and Magnetism
                        </TableCell>
                        <TableCell>
                          AP Physics C: Electricity and Magnetic
                        </TableCell>
                      </TableRow>
                      <TableRow key="15">
                        <TableCell>Computer Programming</TableCell>
                        <TableCell>AP Computer Science A</TableCell>
                      </TableRow>
                      <TableRow key="16">
                        <TableCell>Computer Science</TableCell>
                        <TableCell>
                          AP Computer Science Principles/IB-SL Computer Science
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-sm italic md:hidden pt-2 pl-1">
                    * On devices with smaller screens you may have to scroll to
                    view the entire table
                  </p>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">
              What types of payments are accepted?
            </p>
            <ul className="list-disc">
              <li className="text-base mt-2">
                Google pay, link, and credit card are all accepted. We are
                currently working on implementing other payment methods.
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">
              Where are the in-person sessions located?
            </p>
            <ul className="list-disc">
              <li className="text-base mt-2">
                If the tutor lives near the client, an in-person session can be
                conducted within the home of the client or the tutor, a local
                library, a school, or a different meeting location, whatever is
                preferred by the client works for us.
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">
              Will I get a confirmation email with the details of the session?
            </p>
            <ul className="list-disc">
              <li className="text-base mt-2">
                Yes, after confirming your payment you will be redirected to a
                page that allows the client detail their specific requests on
                the subjects and material to be covered. After filling out this
                form you will recieve a copy of this email as well as a google
                meet link (if applicable).
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">
              What do I need for an online session?
            </p>
            <ul className="list-disc">
              <li className="text-base mt-2">
                You will need a computer, a piece of paper, and something to
                write with. We strongly suggest that a computer, not a phone, be
                used for the google meet because it is important to be able to
                see what the tutor is writing. The tutors may either share their
                screen and write their on a virtual writing platform, such as
                Kami, or they may set up their computer facing a chalkboard of
                whiteboard for the client to follow their work.
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">
              What is the cancellation policy?
            </p>
            <ul className="list-disc">
              <li className="text-base mt-2">
                You may cancel your session up to 24 hours in advance to get a
                complete refund. Refunds will not be granted within 24 hours of
                the scheduled session out of respect for our tutors&#39; times.
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xl underline">Questions? Comments? Concerns?</p>
            <ul className="list-disc">
              <li className="text-base mt-2">
                We&#39;d love to hear from you! Reach out to us:{" "}
                <Snippet symbol="" variant="flat">
                  support@stempiretutoring.com
                </Snippet>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}

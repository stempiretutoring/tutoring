"use client";
import React from "react";
import { Divider } from "@nextui-org/react";
import TutorCard from "./components/card";

export default function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="text-bold text-center mb-2">
          <h1 className="text-lg">
            Read below to learn more about our tutors!
          </h1>
        </div>
        <div className="italic text-center">
          <small>Tip: click a card to learn more about each tutor</small>
        </div>
      </div>
      <Divider />
      <div className="flex justify-center items-center">
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-1">
          <TutorCard name="Danny Christensen" />
          <TutorCard name="Luca Cresti" />
          <TutorCard name="Daniel DaSilva" />
          <TutorCard name="Griffin Forminard" />
          <TutorCard name="Arya Gorti" />
          <TutorCard name="Shreyansh Kabir" />
          <TutorCard name="Joe Kashani" />
          <TutorCard name="Nikhil Kulkarni" />
          <TutorCard name="Jeevan Shah" />
        </div>
      </div>
    </>
  );
}

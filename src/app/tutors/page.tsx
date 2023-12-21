import React from "react";
import { Divider } from "@nextui-org/react";
import TutorCard from "./components/card";

export default function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="text-bold text-center mb-2">
          <h1>Read below to learn more about our tutors!</h1>
        </div>
        <div className="italic text-center">
          <small>Hint: click a card to learn more about each tutor</small>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x0 gap-y-1">
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
        <TutorCard
          name="Joe Kash"
          subjects="Calculus and Physics"
          occupation="Senior at West Morris Mendham"
          path="/chad.jpg"
        />
      </div>
    </>
  );
}

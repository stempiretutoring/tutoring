import React from "react";
import { Image } from "@nextui-org/react";

export default function App() {
  return (
    <div className="h-dvh">
      <div className="flex justify-center align-items">
        <h1 className="text-2xl font-bold underline">Why Us?</h1>
      </div>
      <div className="flex align-items m-10 ">
        <p className="text-xl">
          At STEMpire Tutoring, we don&#39;t believe in forcing clients to sign
          long-term contracts. Instead, we trust that clients will want to stay
          with us due to our tutors&#39; outstanding understanding of material
          as well as the personal connections they form with clients. We are
          also extremely flexible, allowing cancellation up to 24 hours before
          sessions and we are more than willing to accommodate any special
          requests clients may have.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Image
          alt="stempire logo"
          className="m-3"
          width={500}
          height={500}
          src="../../home2.png"
        />
      </div>
    </div>
  );
}

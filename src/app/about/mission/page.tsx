import React from "react";
import { Image } from "@nextui-org/react";

export default function App() {
  return (
    <div className="h-dvh">
      <div className="flex align-items m-10">
        <p className="text-xl">
          STEMpire Tutoring is a private tutoring business that specializes in
          math education for students of all ages and levels. We are run by a
          team of highly qualified and experienced college students from
          prestigious universities, who are passionate about sharing their
          knowledge and enthusiasm for math. We are committed to helping our
          students achieve their academic goals, enhance their skills, and boost
          their confidence. We are dedicated to delivering personalized,
          high-quality, and affordable tutoring services that are tailored to
          each student&#39;s needs, learning style, and pace. We are proud to be
          a socially responsible business that donates 1% of all profits to Khan
          Academy, a non-profit organization that provides free online learning
          resources for everyone.
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

import React from "react";
import { Link } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="whitespace-pre-line">
      Sorry you're not allowed here! 
      Return home <Link showAnchorIcon href="/">here</Link>
      </div>
    </div>
  );
}

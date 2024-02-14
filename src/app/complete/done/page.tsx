import { Link } from "@nextui-org/react";
import React from "react";

export default function App() {
  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="border-3 rounded-md">
        <div className="p-3">
          <h2 className="text-2xl font-bold">
            Everything is all set!{" "}
            <Link href="/" showAnchorIcon className="text-2xl underline">
              Return home here
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

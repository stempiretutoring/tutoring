"use client";
import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/app/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/components/icons/EyeSlashFilledIcon";

export default function App() {
  const [codeInput, setCodeInput] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const code: string = process.env.NEXT_PUBLIC_TUTOR_CODE || "";

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(code);
    console.log(codeInput);
    console.log(codeInput === code);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Authorization Code"
        variant="bordered"
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        className="max-w-xs"
        isRequired
        endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      />
      <Button type="submit" color="warning">
        Submit
      </Button>
    </form>
  );
}

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex justify-center items-center h-screen">
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">Sign Up/Login In</p>
          <p className="text-small text-default-500">
            Create or view your account
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Link href="/api/auth/login" showAnchorIcon>Sign Up/Login</Link>
      </CardBody>
    </Card>
    </div>
  );
}

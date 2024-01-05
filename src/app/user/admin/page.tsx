"use client";
import React, { useState, useCallback, Key, useEffect } from "react";
import {
  Table,
  TableColumn,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Tooltip,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
} from "@nextui-org/react";
import { tutorGET } from "@/app/api/types";
import { EyeFilledIcon } from "@/app/components/icons/EyeFilledIcon";
import { DeleteIcon } from "@/app/components/icons/DeleteIcon";
import { columns } from "./lib/data";

type actionType = {
  action: "delete" | "suspend";
  email: string;
  status: boolean;
};

export default function App() {
  const [action, setAction] = useState<actionType>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [tutors, setTutors] = useState<tutorGET[]>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleOpen = useCallback(
    ({ action, email, status }: actionType) => {
      setAction({ action, email, status });
      onOpen();
    },
    [onOpen],
  );

  const handleDelete = () => {
    fetch("/api/tutors", {
      method: "DELETE",
      body: JSON.stringify({ email: action?.email }),
    });
    setUpdated(true);
    onClose();
  };

  const handleSuspend = () => {
    const body = {
      email: action?.email,
      active: !action?.status,
    };

    fetch("/api/tutors", {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    setUpdated(true);
    onClose();
  };

  const renderCell = useCallback(
    (rowValue: tutorGET, columnKey: Key) => {
      switch (columnKey) {
        case "name":
          return rowValue.name;
        case "email":
          return rowValue.email;
        case "subjects":
          return (
            <div>
              {rowValue.subjects.map((subject) => (
                <Chip key={subject} className="p-1 m-1 text-md">
                  {subject}
                </Chip>
              ))}
            </div>
          );
        case "active":
          return rowValue.active ? (
            <Chip color="success">Active</Chip>
          ) : (
            <Chip color="danger">Not Active</Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="warning" content="Suspend">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    color="warning"
                    variant="light"
                    isIconOnly
                    onPress={() =>
                      handleOpen({
                        action: "suspend",
                        email: rowValue.email,
                        status: rowValue.active,
                      })
                    }
                  >
                    <EyeFilledIcon />
                  </Button>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Button
                    variant="light"
                    color="danger"
                    isIconOnly
                    onPress={() =>
                      handleOpen({
                        action: "delete",
                        email: rowValue.email,
                        status: rowValue.active,
                      })
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </span>
              </Tooltip>
            </div>
          );
      }
    },
    [handleOpen],
  );

  useEffect(() => {
    fetch(`/api/tutors`)
      .then((response) => response.json())
      .then((data) => setTutors(data["documents"]));
  }, [updated]);

  return (
    <>
      {tutors && (
        <>
          <div className="mx-5">
            <Table aria-label="Admin tutor table">
              <TableHeader columns={columns}>
                {(col) => (
                  <TableColumn
                    key={col.key}
                    {...(["name", "email"].includes(col.key)
                      ? { allowsSorting: true }
                      : {})}
                  >
                    {col.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={tutors}>
                {(item) => (
                  <TableRow key={item._id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-bold text-xl">
                  Confirm {action?.action}
                </ModalHeader>
                <ModalBody>
                  <h1 className="text-md">
                    Are you sure you want to {action?.action} the selected user?
                  </h1>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onPress={onClose}>
                    No, I want to go back
                  </Button>
                  <Button
                    onPress={
                      action?.action === "delete" ? handleDelete : handleSuspend
                    }
                    color="danger"
                    variant="ghost"
                  >
                    Yes, I want to continue
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

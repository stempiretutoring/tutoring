"use client";
import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import { FaChevronDown, FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Nav() {
  const path = usePathname().split("/").slice(1);
  const { user } = useUser();

  return (
    <div className="mb-4">
      <Navbar
        isBordered
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-primary",
          ],
        }}
        className="flex flex-wrap nd:flex-nowrap"
      >
        <NavbarBrand>
          <Link color="foreground" href="/">
            <Button
              variant={path[0] === "" ? "ghost" : "faded"}
              isIconOnly
              color="default"
              aria-label="home"
            >
              <FaHome />
            </Button>
          </Link>
        </NavbarBrand>

        <Dropdown>
          <NavbarItem isActive={path.includes("about")}>
            <DropdownTrigger>
              <Button
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<FaChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                About Us
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="About us"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem href="/about/mission" key="mission">Our Mission</DropdownItem>
            <DropdownItem href="/about/rates" key="rates">Rates</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={path.includes("tutors")}>
            <Link aria-current="page" color="foreground" href="/tutors">
              Tutors
            </Link>
          </NavbarItem>

          <NavbarItem isActive={path.includes("book") || path.includes("deck")}>
            <Link href="/book" color="foreground" aria-current="page">
              Appointments
            </Link>
          </NavbarItem>
        </NavbarContent>

        {!user && (
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href="/api/auth/login"
                variant="flat"
              >
                Sign Up/Login
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
        {user && (
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  aria-label="Avatar"
                  className="transition-transform"
                  color="primary"
                  size="sm"
                  src={
                    user.picture ||
                    "https://wvnpa.org/content/uploads/blank-profile-picture-973460_1280-768x768.png"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.name}</p>
                </DropdownItem>
                <DropdownItem key="settings" href="/user">
                  My Profile
                </DropdownItem>
                <DropdownItem key="cart" href="/cart">
                  Cart
                </DropdownItem>

                <DropdownItem key="help_and_feedback" href="/help">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  href="/api/auth/logout"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        )}
      </Navbar>
    </div>
  );
}

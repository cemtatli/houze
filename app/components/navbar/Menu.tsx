"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";

import Avatar from "@/components/shared/Avatar";
import MenuItem from "@/components/navbar/MenuItem";
import { userMenu } from "@/constants/user-menu";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModalModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";

import { TbMenu2 as MenuIcon } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";
import { GiReceiveMoney } from "react-icons/gi";

interface MenuProps {
  currentUser?: SafeUser | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModalModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2.5">
        <div
          onClick={() => onRent()}
          className="hidden cursor-pointer text-sm truncate items-center gap-x-2 font-medium rounded-full px-4 py-2.5 ring-gray-100 ring-offset-1 transition focus-within:ring-2 hover:bg-gray-50 md:flex"
        >
          <div className="hidden lg:inline-flex gap-x-2">
            <GiReceiveMoney className="shrink-0" /> Houze is house
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-2.5 rounded-full border border-gray-200 p-2 md:pr-2 ring-gray-100/50 hover:ring-gray-50/80 ring-2 transition md:py-1"
        >
          <div className="hidden md:block">
            <Avatar
              currentUser={currentUser}
              size={32}
              value={currentUser?.name}
            />
          </div>
          <MenuIcon size={18} />
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute -right-2.5 top-12 ${
            currentUser ? "w-48" : "w-32"
          } font-medium overflow-hidden rounded-lg border border-gray-200 bg-white transition md:right-0`}
        >
          <div className="flex cursor-pointer flex-col rounded-lg p-2 z-50">
            {currentUser ? (
              <>
                <div className="rounded-lg p-2.5 transition text-sm hover:bg-gray-100 flex items-center gap-x-2.5">
                  <div className="shrink-0">
                    <Avatar
                      currentUser={currentUser}
                      size={34}
                      value={currentUser?.name}
                    />
                  </div>
                  <span className="truncate">{currentUser.name}</span>
                </div>
                <hr className="my-2 block" />
                {userMenu.map((menu) => (
                  <MenuItem
                    key={menu.label}
                    icon={menu.icon}
                    label={menu.label}
                    onClick={() => router.push(menu.slug)}
                  />
                ))}
                <MenuItem
                  icon={GiReceiveMoney}
                  onClick={() => rentModal.onOpen()}
                  label="Rent a house"
                />
                <hr className="my-2" />
                <MenuItem
                  icon={BiLogOutCircle}
                  onClick={() => signOut()}
                  label="Log out"
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;

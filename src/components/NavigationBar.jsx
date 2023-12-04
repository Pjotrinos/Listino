import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";
import { Link as Linker } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiListBox } from "@mdi/js";

import { useAtom } from "jotai";
import { isDarkAtom, langueSelectAtom } from "../../state-managment";

import { mdiBrightness5 } from "@mdi/js";
import { mdiBrightness4 } from "@mdi/js";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

function NavigationBar() {
  const [isDark, setIsDark] = useAtom(isDarkAtom);
  
  const [langueSelect, setLangueSelect] = useAtom(langueSelectAtom);
  
  function ChangeTheme() {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.style.backgroundColor = isDark ? "white" : "black";
    }

    setIsDark((pre) => !pre);
  }

  function ChangeLeng(e){
    setLangueSelect(e)
  }
  console.log(langueSelect)
  return (
    <Navbar>
      
      <NavbarBrand>
        <Linker to={""}><Icon path={mdiListBox} size={1} /></Linker>
        <p className="font-bold text-inherit"><Linker to={""}>Listino</Linker></p>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        

        {/* <NavbarItem>
        <Link color="foreground" href="#">
          Shared with me
        </Link>
      </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly className="uppercase" variant="bordered">{langueSelect}</Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Static Actions"
              selectionMode="single"
              disallowEmptySelection
              >
              <DropdownItem onClick={()=> ChangeLeng("cz")} key="cz">CZ</DropdownItem>
              <DropdownItem onClick={()=> ChangeLeng("en")} key="en">EN</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem>
          <Button
            onClick={ChangeTheme}
            color="primary"
            href="#"
            isIconOnly
            variant="flat"
          >
            {isDark == true ? (
              <Icon path={mdiBrightness5} size={1} />
            ) : (
              <Icon path={mdiBrightness4} size={1} />
            )}
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavigationBar;

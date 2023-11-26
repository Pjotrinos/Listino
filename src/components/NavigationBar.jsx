import React from 'react'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button,Link} from "@nextui-org/react";
import { Link as Linker } from "react-router-dom";

import Icon from '@mdi/react';
import { mdiListBox } from '@mdi/js';

function NavigationBar() {

  return (
    <Navbar>
    <NavbarBrand>
    <Icon path={mdiListBox} size={1} />
      <p className="font-bold text-inherit">Listino</p>
    </NavbarBrand>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground">
          <Linker to={""}>Home</Linker>
        </Link>
      </NavbarItem>

      {/* <NavbarItem>
        <Link color="foreground" href="#">
          Shared with me
        </Link>
      </NavbarItem> */}

    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
  )
}

export default NavigationBar
import type { ReactNode } from "react";
import {
  Layout as RALayout,
  CheckForApplicationUpdate,
  Menu,
} from "react-admin";
import Submenu from "./Submenu";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import LocalHospitalTwoToneIcon from "@mui/icons-material/LocalHospitalTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import MedicationTwoToneIcon from "@mui/icons-material/MedicationTwoTone";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";

const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Submenu text="Clinic" icon={<LocalHospitalTwoToneIcon />}>
      <Menu.ResourceItem name="persons" />
      <Menu.ResourceItem name="patients" />
      <Menu.ResourceItem name="appointments" />
      <Menu.ResourceItem name="notifications" />
      <Menu.ResourceItem name="services" />
    </Submenu>
    <Submenu text="Account" icon={<SettingsTwoToneIcon />}>
      <Menu.ResourceItem name="users" />
      <Menu.ResourceItem name="access" />
      <Menu.ResourceItem name="positions" />
    </Submenu>
    <Submenu text="HR" icon={<GroupsTwoToneIcon />}>
      <Menu.ResourceItem name="employees" />
    </Submenu>
    <Submenu text="Inventory" icon={<MedicationTwoToneIcon />}>
      <Menu.ResourceItem name="inventories" />
      <Menu.ResourceItem name="suppliers" />
      <Menu.ResourceItem name="products" />
    </Submenu>
    <Submenu text="Invoice" icon={<ReceiptLongTwoToneIcon />}>
      <Menu.ResourceItem name="discounts" />
      <Menu.ResourceItem name="invoices" />
    </Submenu>
  </Menu>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={MyMenu}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);

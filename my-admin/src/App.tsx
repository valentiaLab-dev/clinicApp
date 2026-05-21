import { Admin, Resource, radiantLightTheme } from "react-admin";
import { Layout } from "./Layout";
import simpleRestProvider from "ra-data-simple-rest";
import {
  PersonList,
  PersonShow,
  PersonEdit,
  PersonCreate,
} from "./resources/person";
import {
  EmployeeList,
  EmployeeShow,
  EmployeeEdit,
  EmployeeCreate,
} from "./resources/employee";
import {
  PositionList,
  PositionShow,
  PositionEdit,
  PositionCreate,
} from "./resources/position";
import {
  AccessList,
  AccessShow,
  AccessEdit,
  AccessCreate,
} from "./resources/access";
import {
  PatientList,
  PatientShow,
  PatientEdit,
  PatientCreate,
} from "./resources/patient";
import {
  AppointmentList,
  AppointmentShow,
  AppointmentEdit,
  AppointmentCreate,
} from "./resources/appointment";
import {
  NotificationList,
  NotificationShow,
  NotificationEdit,
  NotificationCreate,
} from "./resources/notification";
import {
  SupplierList,
  SupplierShow,
  SupplierEdit,
  SupplierCreate,
} from "./resources/supplier";
import {
  ProductList,
  ProductShow,
  ProductEdit,
  ProductCreate,
} from "./resources/product";
import {
  InventoryList,
  InventoryShow,
  InventoryEdit,
  InventoryCreate,
} from "./resources/inventory";
import {
  DiscountList,
  DiscountShow,
  DiscountEdit,
  DiscountCreate,
} from "./resources/discount";
import {
  InvoiceList,
  InvoiceShow,
  InvoiceEdit,
  InvoiceCreate,
} from "./resources/invoice";
import {
  ServiceList,
  ServiceShow,
  ServiceEdit,
  ServiceCreate,
} from "./resources/service";
import { UserList, UserShow, UserEdit, UserCreate } from "./resources/user";
import Dashboard from "./pages/dashboard";
import authProvider from "./security/authProvider";
import BroadcastOnPersonalTwoToneIcon from "@mui/icons-material/BroadcastOnPersonalTwoTone";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import SupervisedUserCircleTwoToneIcon from "@mui/icons-material/SupervisedUserCircleTwoTone";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import PersonalInjuryTwoToneIcon from "@mui/icons-material/PersonalInjuryTwoTone";
import NotificationsTwoToneIcon from "@mui/icons-material/NotificationsTwoTone";
import Groups3TwoToneIcon from "@mui/icons-material/Groups3TwoTone";
import VaccinesTwoToneIcon from "@mui/icons-material/VaccinesTwoTone";
import MedicationTwoToneIcon from "@mui/icons-material/MedicationTwoTone";
import PercentTwoToneIcon from "@mui/icons-material/PercentTwoTone";
import ReceiptLongTwoToneIcon from "@mui/icons-material/ReceiptLongTwoTone";
import BackHandTwoToneIcon from "@mui/icons-material/BackHandTwoTone";

export const App = () => (
  <Admin
    dataProvider={simpleRestProvider(`${import.meta.env.VITE_API_URL}/api`)}
    layout={Layout}
    dashboard={Dashboard}
    theme={radiantLightTheme}
    authProvider={authProvider}
  >
    <Resource
      name="persons"
      list={PersonList}
      show={PersonShow}
      edit={PersonEdit}
      create={PersonCreate}
      icon={PeopleAltTwoToneIcon}
    />
    <Resource
      name="employees"
      list={EmployeeList}
      show={EmployeeShow}
      edit={EmployeeEdit}
      create={EmployeeCreate}
      icon={BadgeTwoToneIcon}
    />
    <Resource
      name="users"
      list={UserList}
      show={UserShow}
      edit={UserEdit}
      create={UserCreate}
      icon={SupervisedUserCircleTwoToneIcon}
    />
    <Resource
      name="positions"
      list={PositionList}
      show={PositionShow}
      edit={PositionEdit}
      create={PositionCreate}
      icon={BroadcastOnPersonalTwoToneIcon}
    />
    <Resource
      name="access"
      list={AccessList}
      show={AccessShow}
      edit={AccessEdit}
      create={AccessCreate}
      icon={AdminPanelSettingsTwoToneIcon}
    />
    <Resource
      name="patients"
      list={PatientList}
      show={PatientShow}
      edit={PatientEdit}
      create={PatientCreate}
      icon={PersonalInjuryTwoToneIcon}
    />
    <Resource
      name="appointments"
      list={AppointmentList}
      show={AppointmentShow}
      edit={AppointmentEdit}
      create={AppointmentCreate}
      icon={CalendarMonthTwoToneIcon}
    />
    <Resource
      name="notifications"
      list={NotificationList}
      show={NotificationShow}
      edit={NotificationEdit}
      create={NotificationCreate}
      icon={NotificationsTwoToneIcon}
    />
    <Resource
      name="suppliers"
      list={SupplierList}
      show={SupplierShow}
      edit={SupplierEdit}
      create={SupplierCreate}
      icon={Groups3TwoToneIcon}
    />
    <Resource
      name="products"
      list={ProductList}
      show={ProductShow}
      edit={ProductEdit}
      create={ProductCreate}
      icon={VaccinesTwoToneIcon}
    />
    <Resource
      name="inventories"
      list={InventoryList}
      show={InventoryShow}
      edit={InventoryEdit}
      create={InventoryCreate}
      icon={MedicationTwoToneIcon}
    />
    <Resource
      name="discounts"
      list={DiscountList}
      show={DiscountShow}
      edit={DiscountEdit}
      create={DiscountCreate}
      icon={PercentTwoToneIcon}
    />
    <Resource
      name="invoices"
      list={InvoiceList}
      show={InvoiceShow}
      edit={InvoiceEdit}
      create={InvoiceCreate}
      icon={ReceiptLongTwoToneIcon}
    />
    <Resource
      name="services"
      list={ServiceList}
      show={ServiceShow}
      edit={ServiceEdit}
      create={ServiceCreate}
      icon={BackHandTwoToneIcon}
    />
  </Admin>
);

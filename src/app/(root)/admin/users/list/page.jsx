import { Container } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import DashboardBreadcrumbs from "@/components/admin/DashboardBreadcrumbs";
import UserList from "@/ui/dashboard/users/UserList";

const links = [
  {
    title: "Dashboard",
    route: "/admin",
  },
  {
    title: "Users",
    route: "/admin/users/list",
  },
  {
    title: "List",
  },
];

const new_user_btn = {
  title: "New User",
  icon: <AddIcon />,
  route: "/admin/users/create",
};

const UserListPage = () => {
  return (
    <Container
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <DashboardBreadcrumbs title="List" links={links} btn={new_user_btn} />

      <UserList />
    </Container>
  );
};

export default UserListPage;

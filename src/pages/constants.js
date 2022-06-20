import React, { Suspense } from "react";

const Login = React.lazy(() => import("./login"));
const Home = React.lazy(() => import("./home"));
const TrunkManagement = React.lazy(() => import("./trunkManagement"));
const HotlineRouting = React.lazy(() => import("./hotlineRouting"));
const CustomerManagement = React.lazy(() => import("./customerManagement"));
const VirtualRouting = React.lazy(() => import("./virtualRouting"));

const Page =
  (Component) =>
  (props) => {
    return (
      <Suspense fallback={<div></div>}>
          <Component {...props} />
      </Suspense>
    );
  };

const pages = {
  login: {
    component: Page(Login),
    accessRoles: [],
    path: "/login",
    exact: true,
  },
  home: {
    component: Page(Home),
    accessRoles: [],
    path: ["/admin/home","/"],
    exact: true,
  },
  trunkManagement: {
    component: Page(TrunkManagement),
    accessRoles: [],
    path: "/admin/trunk-management",
    exact: true,
  },
  hotlineRouting: {
    component: Page(HotlineRouting),
    accessRoles: [],
    path: "/admin/hotline-routing",
    exact: true,
  },
  virtualRouting: {
    component: Page(VirtualRouting),
    accessRoles: [],
    path: "/admin/virtual-routing",
    exact: true,
  },
  customerManagement: {
    component: Page(CustomerManagement),
    accessRoles: [],
    path: "/admin/customer-management",
    exact: true,
  },
};

export {
  pages,
};

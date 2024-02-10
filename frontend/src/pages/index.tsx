import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Main } from "./main";
import { Dapp } from "./dapp";
import { Mint } from "./mint";

const routes = [
  { path: "/", Page: Dapp },
  { path: "/main", Page: Dapp },
  { path: "/dapp", Page: Dapp },
  { path: "/mint", Page: Dapp },
];

function Routing() {
  const getRoutes = () =>
    routes.map(({ path, Page }) => (
      <Route key={path} path={path} element={<Page />} />
    ));

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };

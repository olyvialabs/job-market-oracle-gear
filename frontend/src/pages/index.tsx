import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { VacancyInformation } from "./Vacancy";
import { Graphs } from "./graphs/Graphs";

const routes = [
  { path: "/", Page: Home },
  { path: "/explore", Page: Home },
  { path: "/graphs", Page: Graphs },
  { path: "/vacancy/:id", Page: VacancyInformation },
];

function Routing() {
  const getRoutes = () =>
    routes.map(({ path, Page }) => (
      <Route key={path} path={path} element={<Page />} />
    ));

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };

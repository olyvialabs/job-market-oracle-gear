import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { VacancyInformation } from "./Vacancy";
import { Graphs } from "./graphs/Graphs";
import { RoadmapPage } from "./roadmap/Roadmap";

const routes = [
  { path: "/", Page: Home },
  { path: "/explore", Page: Home },
  { path: "/graphs", Page: Graphs },
  { path: "/roadmap", Page: RoadmapPage },
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

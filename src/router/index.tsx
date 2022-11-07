

import { Route, Routes } from "react-router-dom";
import allRouters from "./allRouters";


export type RoutesItems = {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    children?: RoutesItems[];
};

const renderRoutes = (routes: RoutesItems[]) => {
    return routes.map((item: RoutesItems, index: number) => {
      if (item.children && item.children.length) {
        return (
          <Route path={item.path} element={<item.element />} key={index}>
            {renderRoutes(item.children)}
          </Route>
        );
      } else {
        return (
          <Route path={item.path} element={<item.element />} key={index}></Route>
        );
      }
    });
  };

const BaseRouter = () =>  (
          <Routes>{renderRoutes(allRouters)}</Routes>
      );


export default BaseRouter;
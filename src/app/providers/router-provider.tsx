import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { DetailPage } from "@/pages/detail";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/detail/:locationId", element: <DetailPage /> },
  { path: "*", element: <div className="p-4">Not Found</div> },
]);

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}

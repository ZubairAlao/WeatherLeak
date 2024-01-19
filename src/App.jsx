import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import Weather from "./components/Weather";
import NotFound from "./pages/NotFound"
import Error from "./components/Error"
import SearchedResult from "./pages/SearchedResult"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Weather />}  errorElement={<Error />}/>
      <Route
        path="searched/:cityName"
        element={<SearchedResult />}
        errorElement={<Error />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

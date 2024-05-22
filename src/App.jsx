import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Components/Login";
import Body from "./Components/Body";
import store from "./Utilities/store";
function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/main",
      element: <Body />,
    },
  ]);

  return (
    <Provider store={store}>
      <div className={` bg-bg-img h-max bg-no-repeat w-screen bg-cover overflow-hidden`}>
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;

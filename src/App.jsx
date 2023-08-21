import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
  useLocation,
  Routes,
  Route,
  Router,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  HomeLayout,
  Landing,
  Error,
  NewsLetter,
  Cocktail,
  SinglePageError,
  LandingLayout,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsLetterAction } from "./pages/NewsLetter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

// const router = <createBrowserRouter></createBrowserRouter>;

// const App = () => {
//   const location = useLocation();
//   const background = location.state && location.state.background;

//   return (
//     <QueryClientProvider client={queryClient}>
//       {/* <Router> */}
//       <div className="app">
//         <Routes location={background || location}>
//           <Route path="/" element={<HomeLayout />} errorElement={<Error />}>
//             <Route
//               index
//               element={<Landing />}
//               errorElement={<SinglePageError />}
//               loader={landingLoader(queryClient)}
//             />
//             <Route
//               path="newsLetter"
//               element={<NewsLetter />}
//               action={newsLetterAction}
//             />
//             <Route
//               path="cocktail/:id"
//               element={<Cocktail />}
//               errorElement={<SinglePageError />}
//               loader={singleCocktailLoader(queryClient)}
//             />
//             <Route path="about" element={<About />} />
//           </Route>
//         </Routes>
//         {background && (
//           <Routes>
//             <Route
//               path="cocktail/:id"
//               element={<Cocktail />}
//               errorElement={<SinglePageError />}
//               loader={singleCocktailLoader(queryClient)}
//             />
//           </Routes>
//         )}
//       </div>
//       {/* </Router> */}
//     </QueryClientProvider>
//   );
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
        children: [
          {
            path: "cocktail/:id",
            errorElement: <SinglePageError />,
            loader: singleCocktailLoader(queryClient),
            element: <Cocktail />,
          },
        ],
      },
      {
        path: "newsLetter",
        element: <NewsLetter />,
        action: newsLetterAction,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
export default App;

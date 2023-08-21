import { Outlet } from "react-router-dom";
import Landing from "./Landing";

const LandingLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LandingLayout;

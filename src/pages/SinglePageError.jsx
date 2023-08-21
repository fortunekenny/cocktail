import React from "react";
import { useRouteError, Link } from "react-router-dom";

const SinglePageError = () => {
  const error = useRouteError();
  console.log(error);
  //return <h2>{error.message}</h2>;
  return (
    <>
      <h2>there was an error...</h2>
      <br />
      <br />
      <Link to="/" className="btn">
        back home
      </Link>
    </>
  );
};

export default SinglePageError;

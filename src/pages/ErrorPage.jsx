import {Helmet} from "react-helmet-async";
import {Link} from "react-router-dom";
import errImg from "/src/assets/err.png";

const ErrorPage = () => {
  return (
    <div className=" font-semibold text-center mt-20">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="flex flex-col items-center space-y-4">
        <img src={errImg} alt="" />
        <h2 className="text-5xl font-bold text-error">ERROR 404</h2>
        <Link className="btn-neutral btn btn-sm" to={"/"}>
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

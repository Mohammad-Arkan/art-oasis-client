import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=" font-semibold text-center mt-20">
      <h2 className="text-5xl">ERROR 404</h2>
      <Link className="text-blue-400" to={"/"}>
        BACK TO HOME
      </Link>
    </div>
  );
};

export default ErrorPage;

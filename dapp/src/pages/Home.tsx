import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <div className="h-full p-4 text-center bg-slate-700">
      <div className="text-white">
        Repo:
        <a
          className="underline"
          href="https://github.com/underledgerteam/knowlendge-sharing-session-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/underledgerteam/knowlendge-sharing-session-6
        </a>
      </div>
    </div>
  );
};

export default Home;
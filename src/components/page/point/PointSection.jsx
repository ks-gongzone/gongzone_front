import { Link } from "react-router-dom";

export default function PointSection({ children, title, renderPage }) {
  return (
    <div
      id={ "section" }
      className="flex flex-grow justify-center
                 h-min-[45vh]
                 mb-12 mx-10"
    >
      <div
        className="flex
                   w-[84vw]
                   min-w-[360px] max-w-[960px]"
      >
        <div className="w-full flex flex-col">
          <div className="flex space-x-4">
            <Link to="/myPage/point" className="items-center text-3xl">
              &lt;
            </Link>
            <h2 className="font-bold text-2xl">{ title }</h2>
          </div>
          <hr className="my-12" />
          { children }
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function PointSection({ children, title, renderPage }) {
  return (

      <div
          id={ "section" }
          className="flex flex-grow justify-center
                                     h-min-[45vh]
                                     my-16 mx-24"
      >
        <div
            className="flex flex-grow
                      w-[75vw] min-w-[650px] max-w-[1200px]"
        >
          <div className="bg-gray-50 w-full p-8">
            <div className="flex space-x-4">
              <Link to="/myPage/point" className="items-center text-3xl">&lt;</Link>
              <h2 className="font-bold text-2xl">{ title }</h2>
            </div>
            <hr className="my-12" />
            { children }
          </div>
        </div>
      </div>
  );
}

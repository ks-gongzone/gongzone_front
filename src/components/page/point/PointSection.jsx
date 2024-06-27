export default function PointSection({ children, title }) {
  return (
    <div id={ "section" } className="flex flex-grow justify-center
                                     h-min-[45vh]
                                     my-16 mx-24"
    >
      <div className="flex flex-grow
                      w-[75vw] min-w-[650px] max-w-[1200px]">
        <div className="bg-gray-50 w-full p-8">
          <h2 className="text-2xl font-bold mt-4 ml-8">{ title }</h2>
          <hr className="my-12" />
          { children }
        </div>
      </div>
    </div>
  );
}

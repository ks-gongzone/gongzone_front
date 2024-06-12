export default function Section({ children, title}) {
  return (
    <div id={"section"} className={"flex flex-grow bg- my-8 mx-12"}>
      <div className={"bg-gray-50 w-full p-8"}>
        <h2 className={"text-xl font-bold ml-8"}>{title}</h2>
        <hr className={"my-4"} />
        {children}
      </div>
    </div>
  );
}

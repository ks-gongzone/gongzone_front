export default function Section({ children }) {
  return (
    <div id={"section"} className={"flex flex-grow my-8 mx-12"}>
      {children}
    </div>
  );
}

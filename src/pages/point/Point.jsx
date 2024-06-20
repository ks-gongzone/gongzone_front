import { useParams } from "react-router-dom";
import Section from "../../layouts/Section";

export default function Point() {
  const { memberNo } = useParams();

  return (
    <Section>
      <div className={"bg-gray-50 w-full p-8"}>
        <h2 className={"text-xl"}>포인트 페이지</h2>
        <hr className={"my-4"} />
        <p>포인트 페이지 메인</p>
      </div>
    </Section>
  );
}

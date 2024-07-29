import ScrollButton from "../components/button/scrollButton";
import LayoutFooter from "./Footer";
import LayoutHeader from "./Header";
import ScrollToTop from "./ScrollToTop";

export default function LayoutDefault({ children }) {
  return (
    <div className="w-30 bg-bottom">
      <ScrollToTop />
      <LayoutHeader />
      <div className="w-full flex justify-center">
        <div className="w-full">{children}</div>
      </div>
      <LayoutFooter />
      <ScrollButton />
    </div>
  );
}

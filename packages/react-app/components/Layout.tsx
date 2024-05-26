import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div>
        <Navigation />
        <div>{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;

import { useEffect, useState } from "react";
import Search from "../Modals/Search/Search";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import Policy from "../components/Layout/Policy/Policy";
import Proptypes from "prop-types";
import Dialog from "../Modals/Dialog/Dialog";

const MainLayout = ({ children }) => {
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);

  //Dialog açıldıktan 3 sn sonra açılsın dedik

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog") ? JSON.parse(localStorage.getItem("dialog")) : localStorage.setItem("dialog", JSON.stringify(true));
    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 5000);
  }, []);

  return (
    <div className="main-layout">
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Policy />
      <Footer />
    </div>
  );
};

export default MainLayout;
//eslint hata olarak gösterdği için children in ne olduğunu tanımladık. hata gösterse bile tanımlamasak bile yapar ama yinede tamamladık
MainLayout.propTypes = {
  children: Proptypes.node,
};

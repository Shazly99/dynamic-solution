import LogoSvg from "../../assets/svg/LogoSvg";

const routes = [
  {
    path: "",
    nameEn: "Dashboard",
    nameAr: "لوحة القيادة",
    icon: <LogoSvg.Dashboard className="logoSvg" style={{ width: 17 }} />, 
  }, 

  {
    path: "/contact",
    nameEn: "Contact Us",
    nameAr: "اتصل بنا ",
    icon: <LogoSvg.Contact className="logoSvg" style={{ width: 17 }} />, 
  }, 

];

export default routes
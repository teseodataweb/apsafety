import React from "react";
import HeaderAdmin from '../headeradmin/HeaderAdmin.js';
export default function NavbarAdmin(props) {
  const [scroll, setScroll] = React.useState(0);
  const handleScroll = () => setScroll(document.documentElement.scrollTop);
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const className = scroll > 80 ? "fixed-navbar active" : "fixed-navbar";
  return (
    <div className={className}>
        <HeaderAdmin hclass={props.hclass} Logo={props.Logo} topbarClass={props.topbarClass} />
    </div>
  ); 
}
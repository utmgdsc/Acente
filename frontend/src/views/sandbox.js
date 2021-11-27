import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Sandbox from "../components/Sandbox";
import Test from "../components/Sandbox"
 
export const sandbox = () => {
   return (
       <div id="sandbox">
           <NavBar type="sandboxMenu"/>
           <Sandbox />
           <Footer />
       </div>
   );
 };
  export default sandbox;
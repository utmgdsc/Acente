import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Test from "../components/Test"
 
export const practice = () => {
   return (
       <div id="practice">
           <NavBar type="practiceMenu"/>
           <Test />
           <Footer />
       </div>
   );
 };
  export default practice;
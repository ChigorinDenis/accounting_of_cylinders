import React from "react";
import Steps from "./Steps";
import VisualExpertise from "./VisualExpertise";
import SolidExperitise from "./SolidExpertise";
import PneumoExpertise from "./PnuemoExpertise"
import UltrasonicExpertise from "./UltrasonicExpertise";
function ExpertiseControl() {
  return (
    <>
      <Steps />
      <VisualExpertise />
      <UltrasonicExpertise />
      <SolidExperitise />
      <PneumoExpertise />
    </>
    
  )
}

export default ExpertiseControl;
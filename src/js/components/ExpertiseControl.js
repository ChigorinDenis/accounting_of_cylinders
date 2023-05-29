import React from "react";
import Steps from "./Steps";
import VisualControl from "./VisualControl";
import SolidControl from "./SolidControl";
import PnuemoControl from "./PnuemoControl"
import UltrasonicControl from "./UltrasonicControl";


function ExpertiseControl() {
  return (
    <>
      <Steps />
      <VisualControl />
      <UltrasonicControl />
      <SolidControl />
      <PnuemoControl />
    </>
    
  )
}

export default ExpertiseControl;
import React, { useState } from "react";
import Steps from "./Steps";
import VisualControl from "./VisualControl";
import SolidControl from "./SolidControl";
import PnuemoControl from "./PnuemoControl"
import UltrasonicControl from "./UltrasonicControl";

function ExpertiseControl() {
  const [stepsState, setStepsState] = useState({
    current: 'visual',
  });
  
  const next = (stepName) => {
    setStepsState({current: stepName})
  }

  return (
    <>
      <Steps current={stepsState.current}/>
        {stepsState.current === 'visual' && <VisualControl next={next} />}
        {stepsState.current === 'ultrasonic' && <UltrasonicControl next={next}  />}
        {stepsState.current === 'solid' && <SolidControl next={next} />}
        {stepsState.current === 'pneumatic' && <PnuemoControl next={next} />}
    </>
    
  )
}

export default ExpertiseControl;
import React, { useState } from "react";
import Steps from "./Steps";
import VisualControl from "./VisualControl";
import SolidControl from "./SolidControl";
import PnuemoControl from "./PnuemoControl"
import UltrasonicControl from "./UltrasonicControl";
import { useSelector } from "react-redux";

function ExpertiseControl() {
  const [stepsState, setStepsState] = useState({
    current: 'visual',
  });

  const statusExpertise = useSelector(state => state.expertise.statusExpertise);

  const next = (stepName) => {
    setStepsState({current: stepName})
  }

  return (
    <>
      <Steps current={stepsState.current}/>
        {stepsState.current === 'visual' && <VisualControl next={next} statusExpertise={statusExpertise} />}
        {stepsState.current === 'ultrasonic' && <UltrasonicControl next={next} statusExpertise={statusExpertise} />}
        {stepsState.current === 'solid' && <SolidControl next={next} statusExpertise={statusExpertise} />}
        {stepsState.current === 'pneumatic' && <PnuemoControl next={next} statusExpertise={statusExpertise }/>}
    </>
    
  )
}

export default ExpertiseControl;
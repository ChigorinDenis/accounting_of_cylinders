import React from 'react';
import { Message } from 'semantic-ui-react'

const divideData = (results) => {
  return results.reduce((acc, curr) => {
    if (curr.check_result === 0) {
      acc.failure = [...acc.failure, curr]
    }
    if (curr.check_result === 1) {
      acc.success = [...acc.success, curr]
    }
    return acc;
  }, {success: [], failure: []});
}
const makeVisualMsg = (dividedData) => {
  const {success, failure} = dividedData;
  const baloonsNumberSuccess = success.map((f) => f.prod_number);
  let successMsg = `Поверхностных дефектов на соссудах с зав.№№ ${baloonsNumberSuccess.join(', ')} типа вмятин, трещин, раковин, расслоений, механических повреждений не обнаружено.`;
  let failureMsg = '';
  if (failure.length > 0) {
    const baloonsNumber = failure.map((f) => f.prod_number);
    failureMsg = `Но сосуды с заводскими номерами № ${baloonsNumber.join(', ')} имеют замечания`;
  }
  return {successMsg, failureMsg};
}
const makeUltraMsg = (dividedData) => {
  const {success, failure} = dividedData;
  const baloonsNumberSuccess = success.map((f) => f.prod_number);
  let successMsg = `На обследованных участках недопустимых утончений толщины стенки не зафиксировано для сосудов с зав. №  ${baloonsNumberSuccess.join(', ')}`;
  let failureMsg = '';
  if (failure.length > 0) {
    const baloonsNumber = failure.map((f) => f.prod_number);
    failureMsg = `Но на сосудах с заводскими номерами № ${baloonsNumber.join(', ')} обнаружены недопустимые утончения толщины стенки`;
  }
  return {successMsg, failureMsg};
}
const makeSolidMsg = (dividedData) => {
  const {success, failure} = dividedData;
  const baloonsNumberSuccess = success.map((f) => f.prod_number);
  let successMsg = `Значения твердости находятся в пределах допустимых значений для сосудов с зав. №  ${baloonsNumberSuccess.join(', ')}`;
  let failureMsg = '';
  if (failure.length > 0) {
    const baloonsNumber = failure.map((f) => f.prod_number);
    failureMsg = `Значения твердости находятся ниже допустимых пределах в сосудах № ${baloonsNumber.join(', ')}`;
  }
  return {successMsg, failureMsg};
}
const makePneumaticMsg = (dividedData) => {
  const {success, failure} = dividedData;
  const baloonsNumberSuccess = success.map((f) => f.prod_number);
  let successMsg = `Техническое состояние баллонов №№ ${baloonsNumberSuccess.join(', ')} по результатам пневматического испытания оцениваются положительно`;
  let failureMsg = '';
  if (failure.length > 0) {
    const baloonsNumber = failure.map((f) => f.prod_number);
    failureMsg = `Выявлены источники, которые признаются неудовлетворяющими требованиями дальнейшей экплуатации № ${baloonsNumber.join(', ')}`;
  }
  return {successMsg, failureMsg};
}
const mapControlMake = {
  visual: makeVisualMsg,
  ultrasonic: makeUltraMsg,
  solid: makeSolidMsg, 
  pneumatic: makePneumaticMsg
}

const ResultControlInfo = ({controlName, results, visible}) => {
  const dividedData = divideData(results);
  const makeMsg = mapControlMake[controlName];
  const {successMsg, failureMsg} = makeMsg(dividedData);
  const color = failureMsg ? 'yellow' : 'blue';
  return (
    <>
      {visible && <Message
        color={color}
        header='Заключение'
        content={successMsg}
      />}
      {visible && failureMsg != '' && <Message
        color='red'
        header='Замечание'
        content={failureMsg}
      />}
    </>
  )
}



export default ResultControlInfo;
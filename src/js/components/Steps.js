import React from 'react'
import { Icon, Step, Header} from 'semantic-ui-react'

const Steps = ({ current }) => (
  <Step.Group size='small' ordered>
    <Step active={current === 'visual'}>
      <Step.Content>
        <Step.Title>Визуальный</Step.Title>
        <Step.Description>Визуально измерительный контроль</Step.Description>
      </Step.Content>
    </Step>

    <Step active={current === 'ultrasonic'}>
      <Step.Content>
        <Step.Title>Ульразвуковой</Step.Title>
        <Step.Description>Ультразвуковая толщинаметрия</Step.Description>
      </Step.Content>
    </Step>

    <Step active={current === 'solid'}>
      <Step.Content>
        <Step.Title>Твердость</Step.Title>
        <Step.Description>Замер твердости</Step.Description>
      </Step.Content>
    </Step>
    <Step active={current === 'pneumatic'}>
      <Step.Content>
        <Step.Title>Пневмо</Step.Title>
        <Step.Description>Пневматические испытания</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
)

export default Steps;
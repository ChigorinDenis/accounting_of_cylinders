import React, { useEffect, useState} from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import ChartSurvival from './ChartSurvival';
import ChartFailure from './ChartFailure';
import StatisticInfo from './StatisticInfo';
import getFailureProbability from '../../utils/countProbability';

const chartStyles = {
  width: '700px',
  height: '400px',
};

const Statistic = () => {
  const [math, setMath] = useState([]);
  const [inActiveBaloons, setInActiveBaloons] = useState([]);
  const [probability, setProbability] = useState(40);
  const [month, setMonth] = useState(12);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const dataMath = await electron.ipcRenderer.invoke('get-math');
      const dataBaloons = await electron.ipcRenderer.invoke('get-baloons-inactive');

      const dataProbability = dataBaloons
        .map(baloon => {
          const probability = getFailureProbability(dataMath.survivalData, baloon.prod_date, month);
          return {...baloon, probability}
        })
        .filter((baloon) => (Number(baloon.probability) <= (probability / 100)))

      setInActiveBaloons(dataProbability);

      setMath(dataMath);
      return () => {
        ipcRenderer.removeAllListeners('get-math');
      };
    }
    fetchData(); 
  }, [math, probability, month]);

  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Segment >
            <ChartSurvival data={math.survivalData}/>
          </Segment>
          <Segment>
            <ChartFailure data={math.failureData}/>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <StatisticInfo data={inActiveBaloons} params={{probability, month, setProbability, setMonth}}/>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    
  );
};

export default Statistic;
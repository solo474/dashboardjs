import React, { useState,useContext } from 'react';
import { TimeContext } from '../../Time';
import { useRandomNumber,useRandomNumbersArray } from '../../Random';
import { Grid, Box } from 'theme-ui';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LineMarkSeries,
  Crosshair,
  LineSeries,
  DiscreteColorLegend
} from 'react-vis';

const myDATA = [
  {id: '00036', y: 200400, x: 1504121437},
  {id: '00036', y: 200350, x: 1504121156},
  {id: '00036', y: 200310, x: 1504120874},
  {id: '00036', y: 200260, x: 1504120590},
  {id: '00036', y: 200210, x: 1504120306},
  {id: '00036', y: 200160, x: 1504120024},
  {id: '00036', y: 200120, x: 1504119740},
  {id: '00036', y: 200070, x: 1504119458},
  {id: '00036', y: 200020, x: 1504119177},
  {id: '00036', y: 200120, x: 1504118893},
  {id: '00036', y: 200070, x: 1504118611},
  {id: '00036', y: 199880, x: 1504118330},
  {id: '00036', y: 200120, x: 1504118048},
  {id: '00036', y: 199880, x: 1504117763},
  {id: '00036', y: 200020, x: 1504117481}
];

const yDomain = myDATA.reduce(
  (res, row) => {
    return {
      max: Math.max(res.max, row.y),
      min: Math.min(res.min, row.y)
    };
  },
  {max: -Infinity, min: Infinity}
);

export const TimeSeries = (props) => {

    const { timeCursor, setTimeCursor,
      timeSelection,setTimeSelection } = useContext(TimeContext);

    const firstByte = useRandomNumbersArray({
        initial: 2,
        interval: 1000
    });
    const [firstByteStrokeWidth, setFirstByteStrokeWidth ]= useState('2px');

    const firstPaint = useRandomNumbersArray({
        initial: 2,
        interval: 1000
    });
   const [ firstPaintStrokeWidth, setFirstPaintStrokeWidth ] = useState('2px');


    return (
      <Grid columns={["5fr 1fr"]} >
        <Box>
        <XYPlot
          xType="time"
          width={props.w * 100}
          height={props.h * 30}
          yDomain={[0, 100]}
        > 
        <LineSeries
          color="grey"
          strokeWidth={firstByteStrokeWidth}
          curve={'curveMonotoneX'}
          onNearestX={(datapoint)=>{
              setTimeCursor(datapoint)
          }}
          onSeriesClick={(datapoint)=>{
            setTimeSelection(datapoint.x);
          }}
          onSeriesMouseOver={()=>{
            setFirstByteStrokeWidth('5px');
          }}
          onSeriesMouseOut={()=>{
            setFirstByteStrokeWidth('2px');
          }}

          data={firstByte.map( (number,index) => {
              return {
                  x: index,
                  y: number
              }
          })}/>    
        <LineSeries
            color="green"
            strokeWidth={firstPaintStrokeWidth}
            curve={'curveMonotoneX'}
            onNearestX={(datapoint)=>{
                setTimeCursor(datapoint)
            }}
            onSeriesClick={(datapoint)=>{
              setTimeSelection(datapoint.x)
            }}
            onSeriesMouseOver={()=>{
              setFirstPaintStrokeWidth('5px');
            }}
            onSeriesMouseOut={()=>{
              setFirstPaintStrokeWidth('2px');
            }}
            data={firstPaint.map( (number,index) => {
                return {
                    x: index,
                    y: number
                }
            })}/>     
          <XAxis  />
      <YAxis />
    <Crosshair values={[timeCursor]}/>

    </XYPlot>
    </Box>
    <Box>
    <DiscreteColorLegend items={[{
      title: 'Time To first byte',
      
    },{
      title: 'Time to first paint',
    }]} />
    </Box>
      </Grid>
    );
  }



  
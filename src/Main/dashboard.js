import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  YAxis,
  XAxis,
  HorizontalGridLines,
  VerticalGridLines
} from "react-vis";

import { SingleStat } from '../Panels/SingleStat';
import { TimeSeries } from '../Panels/TimeSeries';
import { AuditAnalyzer } from '../Panels/AuditAnalyzer';

class App extends Component {
  render() {
    return (
      <div>
       <SingleStat {...this.props} />
      </div>
    );
  }
}

export default {
  layout: [
    { content: props => <TimeSeries {...props} w={12} h={7} />, 
      i: "c", x: 0, y: 5, w: 12, h: 7 },
    { content: props => <TimeSeries {...props} w={12} h={7} />, 
      i: "e", x: 0, y: 7, w: 12, h: 7 },
    { content: props => <AuditAnalyzer {...props} w={12} h={7} />,
      i: "d", x: 0, y: 20, w: 12, h: 15 },
  ]
};

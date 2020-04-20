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

class App extends Component {
  render() {
    const data = [
      { x: 0, y: 8 },
      { x: 1, y: 5 },
      { x: 2, y: 4 },
      { x: 3, y: 9 },
      { x: 4, y: 1 },
      { x: 5, y: 7 },
      { x: 6, y: 6 },
      { x: 7, y: 3 },
      { x: 8, y: 2 },
      { x: 9, y: 0 }
    ];
    return (
      <div>
        <XYPlot height={this.props.height} width={this.props.width}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={data} />
        </XYPlot>
      </div>
    );
  }
}

export default {
  layout: [
    {
      content: props => <App {...props} />,
      i: "a",
      x: 0,
      y: 0,
      w: 5,
      h: 5
    },
    {
      content: props => <App {...props} />,
      i: "b",
      x: 0,
      y: 1,
      w: 5,
      h: 5,
      minW: 2,
      maxW: 4,
      isResizable: true
    },
    { content: props => <App {...props} />, i: "c", x: 0, y: 2, w: 5, h: 5 }
  ]
};

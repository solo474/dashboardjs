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

export const createDashboard = () =>  {

  const initialLayout =  [
    {
      content: {
        panel: 'TimeRange',
        w: 12,
        h: 7
     }, 
     i: "1", x: 0, y: 21, w: 12, h: 2 },
    { 
      content: {
        panel: 'Filter',
        w: 12,
        h: 7
    }, 
    i: "2", x: 0, y: 21, w: 12, h: 2 }, 
  { content: {
    panel: 'TimeSeries',
    w: 12,
    h: 7
  }, 
  i: "3", x: 0, y: 7, w: 12, h: 7 },
    { 
      content: {
      panel: 'TimeSeries',
      w: 12,
      h: 7
    }, 
    i: "4", x: 0, y: 7, w: 12, h: 7 },
  {
    content: {
      panel: 'AuditAnalyzer',
      w: 12,
      h: 7
    },
    i: "5", x: 0, y: 20, w: 12, h: 15 
  },
  ];

  const dashboardFromLocalStorage = JSON.parse(window.localStorage.getItem('dashboard'));

  return  dashboardFromLocalStorage || {
    layout: initialLayout
  };

};

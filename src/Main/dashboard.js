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

  ];

  const dashboardFromLocalStorage = JSON.parse(window.localStorage.getItem('dashboard'));

  return  dashboardFromLocalStorage || {
    layout: initialLayout
  };

};

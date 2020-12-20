import React, { Component, useEffect, useState } from 'react';
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  YAxis,
  XAxis,
  HorizontalGridLines,
  VerticalGridLines
} from "react-vis";

export const localDashboards = (
  function(){

    const getDashboards = () => {
      const dashboardsString = window.localStorage.getItem('dashboards') || '{}';
      return JSON.parse(dashboardsString);

    }

    const update = (id,dashboardConfig) =>{
      console.log('dashboard update',dashboardConfig);
      const newDashboards = {...getDashboards(),[id]: dashboardConfig};
      window.localStorage.setItem('dashboards',JSON.stringify(newDashboards));
    }

    const create = (id,object) =>{

    }

    const remove = (id,object) =>{

    }


    const get = (id,object) =>{
      return getDashboards()[id];
    }

    const getApp = (dashboardId,appId) => {
      return getDashboards()[dashboardId]['apps'][appId].name;
    };

    return {
      get,
      create,
      update,
      remove,
      getApp
    };

  }
)();

export const useDashboard = ({id}) =>  {

  const [dashboard,setDashboard] = useState({
    title: ' '
  });


  useEffect(()=>{
    fetch(`https://www.vzsandbox.com/api/default/${id}.json`)
      .then(data=>data.json())
      .then( data => {
        console.log('form network',data);
        setDashboard(data);
        localDashboards.update('1',dashboard)
      })
      .catch( (error)=>{
        console.error(error);
      })
  },[]);

  useEffect(()=>{
    console.log('use effect on first render',JSON.stringify(dashboard));
    localDashboards.update('1',dashboard)

  },[dashboard]);

  const updateLayout = (dashboardId,layout) =>{
    setDashboard(Object.assign({},dashboard,{
      layout: layout.map((data) => {
        const panel = {
          topBar: false,
          panel: 'IdataApp'
        };

        return {
          ...data,
          content: panel
        };
      }) }));

  };

  const updateApp = () => {
    return localDashboards.getApp();
  }

  const getApp = () => {

  }

  return {
    dashboard: dashboard,
    setDashboard,
    updateLayout,
    getApp,
    updateApp
  }

};

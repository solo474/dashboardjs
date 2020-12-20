import React, { Component } from 'react';
import ThundraTraceChart from 'thundra-trace-chart';

export const Traces = React.memo((props) => {

  const sampleTrace = () => {
    const timeing = performance.getEntriesByType('navigation')[0];
    console.log(timeing);
    let trace = [
      {
        traceId: '4e81414c-2bff-439f-9e5c-9e6699b4e24b',
        parentId: '',
        id: '9400a8a9-9650-4312-9514-d4bbc1114a90',
        name: 'document',
        timestamp: timeing.startTime * 1000,
        duration: timeing.duration * 1000,
        serviceName: 'document',
        color: 'green',
        tags: {
          error: false
        }
      },
      {
        traceId: '4e81414c-2bff-439f-9e5c-9e6699b4e24b',
        parentId: '9400a8a9-9650-4312-9514-d4bbc1114a90',
        id: '9400a8a9-9650-4312-9514-d4bbc1114a9a',
        name: 'fetch',
        timestamp: timeing.startTime * 1000,
        duration: (timeing.fetchStart  - timeing.startTime) * 1000,
        serviceName: 'REDIRECT',
        color: 'blue',
        tags: {
          error: false
        }
      },
      {
        traceId: '4e81414c-2bff-439f-9e5c-9e6699b4e24b',
        parentId: '9400a8a9-9650-4312-9514-d4bbc1114a90',
        id: '9400a8a9-9650-4312-9514-d4bbc1114a9d',
        name: 'domain-lookup',
        timestamp: timeing.domainLookupStart * 1000,
        duration: (timeing.domainLookupEnd - timeing.domainLookupStart) * 1000,
        serviceName: 'DNS',
        color: 'hotpink',
        tags: {
          error: false
        }
      },
      {
        traceId: '4e81414c-2bff-439f-9e5c-9e6699b4e24b',
        parentId: '9400a8a9-9650-4312-9514-d4bbc1114a90',
        id: '9400a8a9-9650-4312-9514-d4bbc1114a9e',
        name: 'tcp-connection',
        timestamp: timeing.connectStart * 1000,
        duration: (timeing.connectEnd - timeing.connectStart) * 1000,
        serviceName: 'TCP',
        color: 'pink',
        tags: {
          error: false
        }
      },
      {
        traceId: '4e81414c-2bff-439f-9e5c-9e6699b4e24b',
        parentId: '9400a8a9-9650-4312-9514-d4bbc1114a90',
        id: '9400a8a9-9650-4312-9514-d4bbc1114a9f',
        name: 'http-request',
        timestamp: timeing.requestStart * 1000,
        duration: 0,
        serviceName: 'HTTP',
        color: 'orange',
        tags: {
          error: false
        }
      },
      {
        traceId: '4e81414c-2bff-439f-9e5c-9e6699b4e24b',
        parentId: '9400a8a9-9650-4312-9514-d4bbc1114a90',
        id: '9400a8a9-9650-4312-9514-d4bbc1114a9h',
        name: 'http-waiting',
        timestamp: timeing.requestStart * 1000,
        duration: (timeing.responseStart - timeing.requestStart) * 1000,
        serviceName: 'HTTP',
        color: '#00ff00',
        tags: {
          error: false
        }
      },
      {
        traceId: '4e81414c-2bff-439f-9e5c-9e6699b4e24b',
        parentId: '9400a8a9-9650-4312-9514-d4bbc1114a90',
        id: '9400a8a9-9650-4312-9514-d4bbc1114a9g',
        name: 'http-content-download',
        timestamp: timeing.responseStart * 1000,
        duration: (timeing.responseEnd - timeing.responseStart) * 1000,
        serviceName: 'HTTP',
        color: '#0000ff'
      }
    ]

    return trace;
  }


    return (
      <div>
        <ThundraTraceChart
          traceId="4e81414c-2bff-439f-9e5c-9e6699b4e24b"
          traceSummary={sampleTrace()}
        />
      </div>
    );
});


import React, { useState, useEffect } from 'react';
import { Button, Box } from "theme-ui";
import { Traces } from '../Traces';
import { Opportunities } from '../Opportunities';

export const AuditAnalyzer = () => {
    const [ tab, setTab ] = useState('trace');

    return <Box>
        <Box sx={{textAlign: 'left'}}>
      <Button 
       onClick={() => setTab('trace')}
       variant={tab === 'trace' 
        ? 'outline' 
        : 'secondary'
       } mr={2}>Trace</Button>
      <Button 
       onClick={() => setTab('insights')}
       variant={tab === 'insights' 
        ? 'outline' 
        : 'secondary'
       } mr={2}>Insights</Button>
      <Button 
        onClick={() => setTab('opportunities')}
        variant={tab === 'opportunities' 
        ? 'outline' 
        : 'secondary'
       } mr={2}>Opportunities</Button>
      <Button 
       onClick={() => setTab('errors')}
       variant={tab === 'errors' 
        ? 'outline' 
        : 'secondary'
       } mr={2}>Errors</Button>
      </Box>
      <Box>
         {  tab === 'trace' ? <Box>
              <Traces/>
         </Box> : null }
         {  tab === 'insights' ?  <Box>
              Insights
          </Box>: null }
         {  tab === 'opportunities' ?  <Box>
              <Opportunities/>
          </Box>: null }
        {  tab === 'errors' ?   <Box>
              Errors
          </Box>: null }
      </Box>
    </Box>
};

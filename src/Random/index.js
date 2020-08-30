import { useState,useEffect } from 'react';

export const useRandomNumber = ({initial = 0,interval}) => {
  const [number,setNumber] = useState(initial);


  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(10) + 50);
  }

  useEffect(()=>{

    const time = setInterval(()=>{
        setNumber(getRandomInt(100));
      },interval);
    
    return function() {
        clearInterval(time);
    };
  },[]);

  return number;
};

export const useRandomNumbersArray = ({
    interval = 1000,
    initial = 0,
}) => {

    const number = useRandomNumber({
        initial,
        interval,
    });

    const [movingArray,setMovingArray] = useState( new Array(100).fill(1));
    
    useEffect(()=>{
        const [ignore,...newArray] = movingArray.concat(number);
        setMovingArray(newArray);
        return function(){
            
        }
    },[number]);

    return movingArray;
};

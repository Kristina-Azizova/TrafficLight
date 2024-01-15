import React, { FC, useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import {Box, Paper, Grid, Button} from '@mui/material';
import Colors from './components/Colors';
import './App.css';

interface TrafficLightDotProps {
  color: string;
}

const TrafficLightLeft = styled(Box)({
  writingMode: 'vertical-lr',
});

const TrafficLightRight = styled(Box)({
  writingMode: 'vertical-rl',
});

const TrafficLightVertical = styled(Box)({
});

const TrafficLightDot = styled('div')<TrafficLightDotProps>(({ color }) => ({
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  backgroundColor: color || 'transparent',
}));


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: Colors.GREY,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: Colors.TEXT,
  boxShadow: 'none',
  borderRadius: 0,
  height: '130px',
  display: 'flex',
  flexDirection: 'column', // Set the flex direction to column
  justifyContent: 'center',
  alignItems: 'center',
}));

const ItemGrey = styled(Paper)(({ theme }) => ({
  backgroundColor: Colors.GREY,
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: Colors.TEXT,
  boxShadow: 'none',
  borderRadius: 0,
  display: 'flex',
  height: '100%',
  flexDirection: 'column', 
  justifyContent: 'center',
  alignItems: 'center',
}));

const ItemWhite = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: Colors.TEXT,
  boxShadow: 'none',
  borderRadius: 0,
  display: 'flex'
}));

const ItemVertical = styled(Paper)(({ theme }) => ({
  backgroundColor: Colors.GREY,
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: Colors.TEXT,
  boxShadow: 'none',
  borderRadius: 0,
  height: '130px',
  display: 'flex',
  flexDirection: 'column', // Set the flex direction to column
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const ItemWithLine = styled(Paper)(({ theme }) => ({
  backgroundColor: Colors.GREY,
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderRadius: 0,
  height: '146px',
}));

const WhiteColumn = styled(Grid)(({ theme }) => ({
  background: 'white',
  width: '40px',
  height: '100%',
  writingMode: 'vertical-rl', 
  transform: 'rotate(180deg)',
  padding: theme.spacing(1),
}));

const ItemWithLineHalf = styled(Paper)(({ theme }) => ({
  backgroundColor: Colors.GREY,
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.primary,
  boxShadow: 'none',
  borderRadius: 0,
  height: '146px',
  display: 'flex',
}));

const WhiteColumnHalf = styled(Grid)(({ theme }) => ({
  background: 'white',
  width: '20px',
  height: '50%',
  padding: theme.spacing(1),
}));

const WhiteColumnHalfVertical = styled(Grid)(({ theme }) => ({
  background: 'white',
  textAlign: 'right',
  width: '73px',
  height: '50%',
  padding: theme.spacing(1),
}));

const App: FC = () => {
  const [mainRoadLight, setMainRoadLight] = useState<string>('green');
  const [secondaryRoadLight, setSecondaryRoadLight] = useState<string>('red');
  const [pedestrianRoadLight, setPedestrianRoadLight] = useState<string>('red');
  const [mainYellowLight, setMainYellowLight] = useState<string>('green');
  const [secondaryYellowLight, setSecondaryYellowRoadLight] = useState<string>('green');
  const mainRoadLightRef = useRef<string>(mainRoadLight);
  const secondaryRoadLightRef = useRef<string>(secondaryRoadLight);
  const secondaryYellowLightRef = useRef<string>(secondaryYellowLight);
  const mainYellowLightRef = useRef<string>(mainYellowLight);

  useEffect(() => {
    mainRoadLightRef.current = mainRoadLight;
    secondaryRoadLightRef.current = secondaryRoadLight;
    secondaryYellowLightRef.current = secondaryYellowLight;
    mainYellowLightRef.current = mainYellowLight;

    // Toggle traffic light colors for main road every 20 seconds
    const mainRoadIntervalId = setInterval(() => {
      console.log('MainRoadLight: ' + mainRoadLight);
        setMainYellowLight('yellow');
        setMainRoadLight('yellow');
        setTimeout(() => {
          setMainRoadLight('red');
          setMainYellowLight('red');
          setTimeout(() => {
            setMainYellowLight('yellow');
            setTimeout(() => {
              setMainRoadLight('green');
              setMainYellowLight('green');
            }, 2000);
          }, 5000); 
        }, 1000); 
    }, 20000);

    // Toggle traffic light colors for secondary road every 20 seconds
    const secondaryRoadIntervalId = setInterval(() => {
      console.log('SecondaryRoadLight: ' + secondaryRoadLight);
        setSecondaryYellowRoadLight('yellow');
        setTimeout(() => {
          setSecondaryYellowRoadLight('green');
          setSecondaryRoadLight('green');
          setTimeout(() => {
            setSecondaryRoadLight('yellow');
            setSecondaryYellowRoadLight('yellow');
            setTimeout(() => {
              setSecondaryRoadLight('red');
              setSecondaryYellowRoadLight('red');
            }, 1000);
          }, 5000); 
        }, 2000); 
    }, 20000);

    // Cleanup intervals when component unmounts
    return () => {
      clearInterval(mainRoadIntervalId);
      clearInterval(secondaryRoadIntervalId);
    };
  }, [mainRoadLight, secondaryRoadLight, mainYellowLight, secondaryYellowLight]);

  const handlePedestrianButtonClick = () => {
  
      // Set new states for the lights
      setTimeout(() => {
        if(mainRoadLightRef.current === 'green') {
          setMainRoadLight('yellow');
          setMainYellowLight('yellow');
        } else if (mainRoadLightRef.current === 'yellow') {
          setMainRoadLight('red');
        } else {
          setMainRoadLight('red');
          setMainYellowLight('red');
        }
        
        if(secondaryRoadLightRef.current === 'green'){
          setSecondaryYellowRoadLight('yellow');
          setSecondaryRoadLight('yellow');
        }else if(secondaryRoadLightRef.current === 'yellow'){
          setSecondaryRoadLight('red');
        } else {
          setSecondaryYellowRoadLight('red');
          setSecondaryRoadLight('red');
        }

        setTimeout(() => {
          setPedestrianRoadLight('green');
          setMainRoadLight('red');
          setMainYellowLight('red');
          setSecondaryRoadLight('red');
          setSecondaryYellowRoadLight('red');
          setTimeout(() => {
            setMainYellowLight('yellow');
            setTimeout(() => {
              setMainYellowLight('green');
              setMainRoadLight('green');
              setPedestrianRoadLight('red');
            }, 2000);
          }, 3000);
        }, 1000);
      }, 5000);

      //console.log('MainRoadLight: ' + mainRoadLight);
      //console.log('SecondaryRoadLight: ' + secondaryRoadLight);
      /*if (mainRoadLightRef.current === 'red' && secondaryRoadLightRef.current === 'red') {
        //console.log('Current Main Road Light:', mainRoadLightRef.current, secondaryRoadLightRef.current);
        if (secondaryYellowLightRef.current !== 'yellow' && mainYellowLightRef.current !== 'yellow') {
          setPedestrianRoadLight('green');
          // Keep pedestrian light green for 3 seconds
          setTimeout(() => {
            setPedestrianRoadLight('red');
          }, 3000);
        }
      } else {
        setPedestrianRoadLight('red');
        // Revert to the original states after 5 second
    
      }*/
    };

  const handleSecondaryTraficButtonClick = () => {
    // Save the current state of all lights
    const originalState = {
      secondary: secondaryRoadLight,
      secondaryYellow: secondaryYellowLight,
      main: mainRoadLight,
      mainYellow: mainYellowLight,
    };

    // Set new states for the lights
    setPedestrianRoadLight('red');
    setSecondaryRoadLight('green');
    setSecondaryYellowRoadLight('red');
    setMainRoadLight('red');
    setMainYellowLight('red');

    // Revert to the original states after 5 second
    setTimeout(() => {
      setSecondaryRoadLight('yellow');
      setSecondaryYellowRoadLight('yellow');
      setMainYellowLight('yellow');
      setTimeout(() => {
        setSecondaryYellowRoadLight(originalState.secondaryYellow);
        setMainYellowLight(originalState.mainYellow);
        setSecondaryRoadLight(originalState.secondary);
        setMainRoadLight(originalState.main);
      }, 1000);
    }, 3000);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        {/* First Row */}
        <Grid container spacing={0} >
          <Grid item xs={5}>
            <ItemWhite />
          </Grid>
          <Grid item xs={2} >
            <ItemWhite />
          </Grid>
          <Grid item xs={1} >
            <ItemWhite id='TraficLightPedestrianRight' className='tl-pedestrian-top'>
              <TrafficLightLeft
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={{ sm: 'row' }}>
                <TrafficLightDot color={pedestrianRoadLight === 'red' ? Colors.RED : Colors.DARK_RED} />
                <TrafficLightDot color={pedestrianRoadLight === 'green' ? Colors.GREEN : Colors.DARK_GREEN} />
              </TrafficLightLeft>
            </ItemWhite>
          </Grid>
          <Grid item xs={4} className='traffic-row-top' >
            <ItemWhite id='SideRoadTrafficLightRight' className='traffic-light-left'>
              <TrafficLightLeft
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                flexDirection={{ sm: 'column' }}>
                <TrafficLightDot color={mainRoadLight === 'red' ? Colors.RED : Colors.DARK_RED} />
                <TrafficLightDot color={mainYellowLight === 'yellow' ? Colors.YELLOW : Colors.DARK_YELLOW} />
                <TrafficLightDot color={mainRoadLight === 'green' ? Colors.GREEN : Colors.DARK_GREEN} />
              </TrafficLightLeft>
            </ItemWhite>
          </Grid>
        </Grid>
        {/* Second Row */}
        <Grid container spacing={0} >
          <Grid item xs={4} >
            <Item >Hauptstraße</Item>
          </Grid>
          <Grid item xs={1} >
            <ItemWithLineHalf className='right-column'>
              <WhiteColumnHalf className='half-column' item xs={1} ></WhiteColumnHalf>
            </ItemWithLineHalf>
          </Grid>
          <Grid item xs={2} >
            <ItemGrey />
          </Grid>
          <Grid item xs={1}>
            <ItemWithLine className='pedestrian-box'>
              <WhiteColumn item xs={12} >Fußgängerüberweg</WhiteColumn>
            </ItemWithLine>
          </Grid>
          <Grid item xs={1} >
            <ItemWithLineHalf className='left-column'>
              <WhiteColumnHalf className='half-column' item xs={1} ></WhiteColumnHalf>
            </ItemWithLineHalf>
          </Grid>
          <Grid item xs={3} >
            <Item />
          </Grid>
        </Grid>
        {/* Third Row */}
        <Grid container spacing={0} >
          <Grid item xs={5} >
            <ItemWhite id='MainRoadTrafficLightRight' className='traffic-light-right'>
              <TrafficLightRight
                display="flex"
                justifyContent="center"
                alignContent="flex-end"
                flexDirection={{ sm: 'column' }}>
                <TrafficLightDot color={mainRoadLight === 'red' ? Colors.RED : Colors.DARK_RED} />
                <TrafficLightDot color={mainYellowLight === 'yellow' ? Colors.YELLOW : Colors.DARK_YELLOW} />
                <TrafficLightDot color={mainRoadLight === 'green' ? Colors.GREEN : Colors.DARK_GREEN} />
              </TrafficLightRight>
            </ItemWhite>
          </Grid>
          <Grid item
            xs={2}
            container
            justifyContent="center"
            alignItems="center"
            flexDirection={{ sm: 'column' }}
            className="verticalRow">
            <ItemVertical className='verticalStreet'>
              <div className='vertical-box'>
                <ItemWithLineHalf className='vertical-column'>
                  <WhiteColumnHalfVertical className='half-column vertical-half-column' item xs={1} ></WhiteColumnHalfVertical>
                </ItemWithLineHalf>
              </div>
              <div className='p-xs'>Nebenstraße</div>
            </ItemVertical>
          </Grid>
          <Grid item>
            <ItemWhite id='SecondaryRoadTrafficLightRight' className='traffic-light-vertical'>
              <TrafficLightVertical>
                <TrafficLightDot color={secondaryRoadLight === 'red' ? Colors.RED : Colors.DARK_RED} />
                <TrafficLightDot color={secondaryYellowLight === 'yellow' ? Colors.YELLOW : Colors.DARK_YELLOW} />
                <TrafficLightDot color={secondaryRoadLight === 'green' ? Colors.GREEN : Colors.DARK_GREEN} />
              </TrafficLightVertical>
            </ItemWhite>
          </Grid>
          <Grid item xs={1} >
            <ItemWhite id='TraficLightPedestrianLeft' className='tl-pedestrian-bottom'>
              <TrafficLightLeft
                display="flex"
                justifyContent="flex-start"
                alignItems="flex-start"
                flexDirection={{ sm: 'row' }}>
                <TrafficLightDot color={pedestrianRoadLight === 'red' ? Colors.RED : Colors.DARK_RED} />
                <TrafficLightDot color={pedestrianRoadLight === 'green' ? Colors.GREEN : Colors.DARK_GREEN} />
              </TrafficLightLeft>
            </ItemWhite>
          </Grid>
          <Grid item xs={3} >
            <ItemWhite />
          </Grid>
        </Grid>
        {/* Button for pedestrian/secondary road */}
        <Grid container spacing={0} >
          <Grid item xs={6} >
            <Button variant="contained" onClick={handleSecondaryTraficButtonClick}>
              Toggle Secondary Road Light
            </Button>
          </Grid>
          <Grid item xs={6} >
            <Button variant="contained" onClick={handlePedestrianButtonClick}>
              Toggle Pedestrian Light
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
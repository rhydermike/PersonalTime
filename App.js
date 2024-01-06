import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'; // expo install @react-native-community/datetimepicker
import { Divider } from '@rneui/themed';

var hoursInAdvance = 4;
const msecsPerHour = 60 * 60;
var CTD = new Date();
var YTD = new Date();
var WUTD = new Date();
var whichTime = 0;
//var standardWUTD = new Date();

export default function App() {
  
  const [count, setCount]= useState(7);
  const [currentTime, setCurrentTime] = useState(new Date)
  const [wakeUpTime, setWakeUpTime] = useState(new Date)
  const [yourTime, setYourTime] = useState(new Date)
  const [standardWakeUp, setStandardWakeUp] = useState (new Date)
  const [wakeUpTimeString, setWakeUpTimeString] = useState("Wake up time: ");
  const [timeDifference, setTimeDifference] = useState(0);
  const [timeDifferenceString, setTimeDifferenceString] = useState(" ");
  const [DayLengthString, setDayLengthString] = useState("");
  const [dayLength, setDayLength] = useState(0);

  

  /*standardWakeUp.setHours(8);
      standardWakeUp.setMinutes(0);
      standardWakeUp.setSeconds (0);
      */
//date picker
   
  useEffect(() => {
    const interval = setInterval(() => {
      updateTime()

      
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  
  function handleClick() {
      
  }

  

  function updateTime()
    {
      
      wakeUpTime.setSeconds(0);
      standardWakeUp.setSeconds(0);
      standardWakeUp.setHours(8);
      standardWakeUp.setMinutes(0);
      standardWakeUp.setSeconds (0);

      //get current time 
      var CTD = new Date();
      //CTD.setSeconds (0);

      var WU = wakeUpTime.getTime();      
      var SWU = standardWakeUp.getTime();
      
      
      var td = WU - SWU //calculate difference between standard wake up time and personal wake up time
      var timeDifferenceHrs = ((td / 60.0) / 60) / 1000 ;
      

      var timeDifferenceMins = Math.floor((timeDifferenceHrs - Math.floor (timeDifferenceHrs)) * 60);
      setTimeDifference (td);
      
      var DTS = ""+Math.floor(timeDifferenceHrs) + 'H' +
      timeDifferenceMins + 'M'
      const newString = DTS;
      setTimeDifferenceString (newString);


      console.log(""+timeDifferenceString);
      
      //calc current day length

      var dayLength = CTD.getTime() - wakeUpTime.getTime();


      // build strings DL and WU
      var DayLengthHrs = Math.round((((dayLength / 60) / 1000)) / 60);
      var DayLengthMins = Math.floor((((dayLength / 60) / 1000)) % 60);
      const tempstring = ""+DayLengthHrs + "H " + DayLengthMins + "M";
      setDayLengthString (tempstring)
      
      setWakeUpTimeString("Wake up time: "+ format (wakeUpTime,"HH:mm:ss" ))


      //convert current time into int
      var CTmsec = CTD.getTime();
      var YTmsec = CTmsec + timeDifference; // calc personal time
      setCurrentTime(new Date(CTmsec));
      setYourTime(new Date(YTmsec));
     
      setCount(count + 1);
      
        
    }
    
  //date picker code
  const [date, setDate] = useState(new Date());

  

  function pressWUButton ()
  { 
    whichTime =0;
    console.log("WU pressed"+ whichTime);
    showTimepicker();
    
  }

  function pressSWUButton ()
  {
    whichTime = 1;
    console.log("SWU pressed"+ whichTime);
    showTimepicker();
  }

  function showTimepicker(){

    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'time',
      is24Hour: true,
    });
  };
  

  const onChange = (event, selectedDate) => {
    if (whichTime == 0)
    {
      console.log("Setting wake up time");
    setWakeUpTime(selectedDate);
    }
    if (whichTime == 1) {
      console.log("Setting SWUT");
    setStandardWakeUp(selectedDate);
    }
    updateTime();
  };



  //Standard wake up time time picker


  return (

    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={pressWUButton} >
      <Text style={[styles.text, styles.button]}>Your wake up time: {format (wakeUpTime, "HH:mm")}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={pressSWUButton} >
      <Text style={[styles.text, styles.button]}>Standard wake up: {format (standardWakeUp, "HH:mm")}</Text>
      </TouchableOpacity>

      <Divider width={2} color="777" />
      <Text style={styles.text}>Time difference: {timeDifferenceString}</Text>
      <Text style={styles.text}>Day length: {DayLengthString} </Text>
      <Text style={styles.text}>Current time: {format (currentTime, "HH:mm:ss")}</Text>
      <Text style={styles.text}>Your time: {format (yourTime,"HH:mm:ss" )}</Text>

      <StatusBar style="light" />
    </View>
  );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 10,
    backgroundColor: '#333',
  },
  text: {
    fontSize: 24,
    color: '#fff',
    backgroundColor: '#666',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    color: '#000',
    backgroundColor: '#fff'
  },
  });
  

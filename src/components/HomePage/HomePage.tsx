import React, {useState,useEffect} from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave
} from '@ionic/react';
import Thermometer from 'react-thermometer-component'
const ToolBar: React.FC<{temp: number, type: string}> = ({temp, type}) =>{  
  useEffect(() =>{
  },[])
  return (
    <div className = "Thermometer">
      <Thermometer 
      theme = 'light'
      value = {temp}
      max = {100}
      format = {type}
      />
    </div>
  );
};

export default ToolBar;

import React, {useState,useEffect} from 'react';
import "./Toolbar.css"
import Disconneted from "../../theme/Disconnected.png"
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
  IonMenuButton
} from '@ionic/react';
import {menuOutline} from 'ionicons/icons'
const ToolBar: React.FC<{name: string}> = (props: {name: string}) =>{  
  useEffect(() =>{

  },[])
  return (
    <div className = "Toolbar">
      <div>
      </div>
      <div>
        {props.name}
      </div>
      <div>
      <img src = {Disconneted} />
      </div>
    </div>
  );
};

export default ToolBar;

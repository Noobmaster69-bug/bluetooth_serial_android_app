import React, {useState,useRef,useEffect} from 'react';
import { IonInput, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenu, IonItem, IonList ,IonMenuButton,IonButtons, useIonAlert, useIonViewDidEnter, useIonViewWillEnter, IonFooter, IonButton, IonLabel} from '@ionic/react';
import {send} from "ionicons/icons"
import "./Terminal.css"
import imga from '../../theme/HUHU.png'
const BS = require('cordova-plugin-bluetooth-serial')

const Terminal: React.FC = (props) =>{  
  const SendData = useRef(null)
  const [Mess,setMess] = useState([])
  const [Data,setData] = useState([])
  const [display,setdisplay] = useState([false,false])
  const sendData = () =>{
    
    let data = SendData.current!.value + "\r\n"
    BS.write(data)
    SendData.current.value = ""
    onData(data,"trans")
    setMess(Data.map((dat) =>
    <IonItem className = {dat.type}><IonLabel>{dat.data}</IonLabel></IonItem>
    ))
  }
  const onData = (data,type) =>{
    const temp1 = Data
    temp1.push({data: data,type: type})
    setData(temp1)
  }
  useIonViewWillEnter(() =>{
    setdisplay([false,false])
    BS.subscribe('\n',(data) => {
      onData(data,'re')
      setMess(Data.map((dat) =>
      <IonItem className = {dat.type}><IonLabel className = {dat.type}>{dat.data}</IonLabel></IonItem>
      ))
    })
    BS.isConnected(() =>{setdisplay([true,false])},() =>{setdisplay([false,true])})
  })

  return (
    <IonPage className = "Terminal">
      <IonHeader>
        <IonToolbar color = "success">
          <IonTitle>Terminal</IonTitle>
          <IonButtons  slot="start" >
            <IonMenuButton autoHide = {false} id = "main"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {display[0]&&(<IonList>
          {Mess}
        </IonList>)}
        {display[1]&&(
        <div className = "Disconnect">
          <img src = {imga}/>
          <div>Oh no! Please connect to devices to continue</div>
        </div>)}
      </IonContent>
      <IonFooter>
        {display[0]&&(<IonItem className = "input">
          <IonInput autofocus = {true} ref = {SendData}/>
          <IonButton onClick = {() =>(sendData())} color = "success"><IonIcon size="large" icon = {send} /></IonButton>
        </IonItem>)}
      </IonFooter>
    </IonPage>
  );
};

export default Terminal;

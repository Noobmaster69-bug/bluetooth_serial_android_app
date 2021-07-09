import React, {useState,useRef,useEffect} from 'react';
import { IonInput, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonToast, IonItem, IonList ,IonMenuButton,IonButtons, useIonViewWillEnter, IonFooter, IonButton, IonLabel,useIonViewDidEnter} from '@ionic/react';
import {send} from "ionicons/icons"
import "./Terminal.css"
import imga from '../../theme/HUHU.png'
const BS = require('cordova-plugin-bluetooth-serial')

const Terminal: React.FC = (props) =>{  
  const SendData = useRef(null)
  const content = useRef(null)
  const [Mess,setMess] = useState([])
  const [Data,setData] = useState([])
  const [Toast,disToast] = useIonToast()
  const onDisconnect = () =>{
    BS.disconnect((s) => toast(s),(f) => toast(f))
  }
  const toast = (mes) =>{
    Toast({
      message : mes,
      duration : 30,
    })
  }

  const sendData = (data) =>{
    BS.isConnected(() =>{
      BS.write(data,(s) =>{   
        SendData.current.value = ""
        var temp1 = Data
        temp1.push({data: data, id:Data.length,class: "trans"})
        setData(temp1)
        setMess(Data.map((dat) =>
        <IonItem className = {dat.class} id = {"row-"+dat.id}><IonLabel className = {dat.class}>{dat.data}</IonLabel></IonItem>
        ))
      })
    })
  }
  useIonViewWillEnter(() =>{
    setData([])
    setMess([])
    BS.subscribe('\n',(data) => {
      var temp1 = Data
      temp1.push({data: data, class: "re"})
      setMess(Data.map((dat) =>
      <IonItem className = {dat.class} ><IonLabel className = {dat.class}>{dat.data}</IonLabel></IonItem>
      ))
    })
  },[])

  return (
    <IonPage className = "Terminal">
      <IonHeader>
        <IonToolbar className= "toolbar">
          <IonTitle>
            <span>Terminal</span>
            <span>          <IonButton onClick = {onDisconnect}>Disconnect</IonButton>
{/* {          <IonButton 
          onClick = {() => {
            setData([])
            setMess([])
          }}     
            >Clear</IonButton></span>} */}
            </span>
          </IonTitle>
          <IonButtons  slot="start" >
            <IonMenuButton autoHide = {false} id = "main"/>
          </IonButtons>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollEvents={true} ref ={content}>
        <IonList>
          {Mess}
        </IonList>
      </IonContent >
      <IonFooter>
        <IonItem className = "input">
          <IonButton onClick ={() =>sendData('a')}>ON</IonButton>
          <IonButton onClick = {() =>sendData('b')}>OFF</IonButton>
          <IonButton onClick = {() =>sendData('K')}>K</IonButton>
          <IonButton onClick = {() =>sendData('F')}>F</IonButton>
        </IonItem>
        <IonItem className = "input">
          <IonInput autofocus = {true} ref = {SendData}/>
          <IonButton onClick = {() =>(sendData(SendData.current!.value + "\r\n"))}><IonIcon size="large" icon = {send} /></IonButton>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
};

export default Terminal;

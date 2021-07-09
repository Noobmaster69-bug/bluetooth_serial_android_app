import React, {useState,useEffect} from 'react';
import './Devices.css';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenu, IonItem, IonList ,IonMenuButton,IonButtons, useIonAlert, useIonToast, useIonViewWillEnter} from '@ionic/react';
const BS = require('cordova-plugin-bluetooth-serial')

const Devices: React.FC = (props) =>{  
  const [DevicesName,setDevicesName] =useState([])
  const [AL] = useIonAlert()
  const [Toast,disToast] = useIonToast()


  const toast = (mes) =>{
    Toast({
      message : mes,
      duration : 30,
    })
  }
  const Connect = (id) =>{
    BS.connect(id,(s) => toast("Connect successful"),() =>{
      Connect(id)
    })
  }
  const onDevice = (id,name) =>{
    let a = "Do you want to connect to " + name
    let Alert = {
      header: 'Alert',
      message: a,
      buttons: [
        'Cancel',
        {text: 'OK', handler: () =>Connect(id)},
      ]
    }
    AL(Alert)
  }
  useIonViewWillEnter(() =>{
    BS.list((list) =>{
      let temp1 =list
      let temp = temp1.map((DV) =>
        <IonItem key = {DV.id} onClick = {() => onDevice(DV.id,DV.name)}>{DV.name}</IonItem>
      )
      setDevicesName(temp)
    },(f) =>alert(f))
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color = "success">
          <IonTitle>Devices List</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton autoHide = {false} id = "main"/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {DevicesName}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Devices;

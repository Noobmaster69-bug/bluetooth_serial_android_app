import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardTitle ,IonMenuButton,IonButtons, useIonToast, useIonViewWillEnter} from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Home.css';
import React, {useState,useEffect} from 'react';
import imga from '../../theme/HUHU.png'
import Thermometer from 'react-thermometer-component'
import ON from '../../theme/ON.png'
import OFF from '../../theme/OFF.png'
const BS = require('cordova-plugin-bluetooth-serial')
 
const Home: React.FC = () => {
  const [temp,setTemp] = useState(null)
  const [type,settype] = useState("°C")
  const [LED,setLED] = useState(true) 
  const [displayThermo,setdisplayThermo] = useState([false,false])
  const [Toast,disToast] = useIonToast()


  const toast = (mes) =>{
    Toast({
      message : mes,
      duration : 30,
    })
  }

  const onLED = () =>{
    setLED(!LED)
    BS.write("LED " + ((LED) ? ("ON") : ("OFF")) + "\r\n")
  }
  const onDCN = () =>{
    BS.disconnect(() => toast("Disconnected"), () => toast("Failed to disconnect devices! Please try again"))
    BS.isConnected(() =>{setdisplayThermo([true,false])},() =>{setdisplayThermo([false,true])})
  }
  useIonViewWillEnter(() => {
    setdisplayThermo([false,false])
    const Rec = () =>{
      BS.subscribe('\n',(data) =>{
        if(data === "LED ON\r\n"){
          setLED(true)
        } else
        if(data === "LED OFF\r\n"){
          setLED(false)
        } else
        if(data[data.length -4] + data[data.length -3] ==="°C"){
          data = data.slice(0,data.length -4)
          setTemp(data)
        }
      })
    }
    BS.isConnected(() =>{setdisplayThermo([true,false])},() =>{setdisplayThermo([false,true])})
    Rec()
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color = "success">
          <IonTitle>Home</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton autoHide = {false} id = "main"/>
            
          </IonButtons>
          
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color ={(LED) ? "light" :"dark"}>
        <div className = "screen">
          {displayThermo[0]&&(
            <div>
              <IonButton className ="light" fill = "outline" color = "success" onClick = {() => {onLED()}}><span>Turn {LED ? "OFF" : "ON"}</span></IonButton>
              <IonCard color ={(LED) ? "light" :"dark"}>
                <IonCardContent >
                  <IonCardTitle>Temperature</IonCardTitle>                 
                  <div className = "Thermometer">
                    <div>
                      <Thermometer 
                      theme = 'light'
                      value = {temp}
                      max = {100}
                      format = {type}
                      height={200}
                      />
                    </div>
                    {LED&&(<img src ={ON} className ="bulb"/>)}
                    {!LED&&(<img src ={OFF} className ="bulb"/>)}
                  </div>
                </IonCardContent>
              </IonCard>
              <IonButton color = "success" onClick = {() => {onDCN()}}>Disconnect</IonButton>
            </div>
)}
          {displayThermo[1]&&(

              <div className = "Disconnect">
                <img src = {imga}/>
              <div>Oh no! Please connect to devices to continue</div>
            </div>  

          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

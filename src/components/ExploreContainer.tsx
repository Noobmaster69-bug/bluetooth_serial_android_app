import React, {useState,useEffect} from 'react';
import './ExploreContainer.css';
import bluetoothSerial from 'cordova-plugin-bluetooth-serial'
import {BluetoothSerial} from '@ionic-native/bluetooth-serial'
const ExploreContainer: React.FC = (props) =>{  
  const BS = BluetoothSerial
  const [deviceslist,setdeviceslist] = useState([])
  const [deviceName,setdeviceName] = useState([])
  const [data,setdata] = useState()
  const onLedON = () =>{
    console.log("LED ON")
  }
  const onLedOFF = () =>{
    console.log("LED OFF")
  }
  const onTEMP = (temp) =>{
    console.log(temp)
  }
  const Connect = (id) =>{
    bluetoothSerial.connect(id,(suc) => { console.log(suc); },(fal) => Connect(id))
  }
  const SendData = (data) =>{
    bluetoothSerial.write(data,(suc) => console.log(suc), (fal) => SendData(data))
  }
  const onSelectDevice = (id) =>{
    Connect(id)
  }
  useEffect(() =>{
    bluetoothSerial.list((value) =>{
      let names = value.map((name) =>
        <div key = {name.name} onClick = {() => onSelectDevice(name.id)}>{name.name}</div>
      )
      let list = value
      setdeviceslist(list)
      setdeviceName(names)
    })
    bluetoothSerial.subscribe('\n', function (data) {
      if(data === "LED ON\r\n") {
        onLedON();
      }
      else{
        if (data === "LED OFF\r\n"){
          onLedOFF();
        }
        else{
          if (data[data.length-4] + data[data.length-3] === "°C"){
            onTEMP(data);
          }
        }
      }
    });
  },[])
  return (
    <div className="container">
      <div className = "Device_Name">
        {deviceName}
      </div>

      <div className = "input_field">
        <input id = "input"></input>
        <div onClick = {() =>{
          const a = (document.getElementById("input") as HTMLInputElement).value
          SendData(a)
        }} >
          Send
        </div>
        <div>{data}</div>
      </div>
    </div>
  );
};

export default ExploreContainer;

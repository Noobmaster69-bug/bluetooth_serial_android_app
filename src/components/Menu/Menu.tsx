import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonMenuToggle,
  IonLabel,
  IonIcon
} from '@ionic/react';
import './Menu.css'
import {home, hardwareChip, terminal} from "ionicons/icons"
const Menu = () =>{  
    return(
      <IonMenu side="start" contentId="main" type = "push">
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>MENU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/home"} routerDirection="none">
              <IonLabel className = "end"><IonIcon icon = {home}/></IonLabel>
              <IonLabel>Home</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/device"} routerDirection="none">
              <IonLabel className = "end"><IonIcon icon = {hardwareChip}/></IonLabel>
              <IonLabel>Devices List</IonLabel>
            </IonItem>
            <IonItem button routerLink={"/terminal"} routerDirection="none">
              <IonLabel className = "end"><IonIcon icon = {terminal}/></IonLabel>
              <IonLabel>Terminal</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  )
}
export default Menu;


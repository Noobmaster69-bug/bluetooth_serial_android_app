import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonMenu ,IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle, IonLabel, IonIcon} from '@ionic/react';
import { terminalOutline } from 'ionicons/icons';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import Menu from './components/Menu/Menu'
import Devices from './pages/Devices/Devices'
import Terminal from './pages/Terminal/Terminal'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Menu/>
      <IonRouterOutlet  id="main">
        <Route path="/device" component={Devices} exact={true} />
        <Route path="/terminal" component={Terminal} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/device" />} />
        <Route exact path= "/temp"  render={() => <Redirect to="/terminal" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

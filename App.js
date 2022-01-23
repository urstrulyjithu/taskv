import React , {Component} from 'react'
import { View, Text } from 'react-native'
import OneSignal from 'react-native-onesignal';
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod';
import Login from './login';

class App extends Component {
  constructor(properties){
  super(properties);
  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);
  OneSignal.setAppId("044d5b85-315d-4f74-8c20-637af78be5e4");
  //END OneSignal Init Cod


  //Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  // console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  // console.log("notification: ", notification);
  const data = notification.additionalData
  // console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  // console.log("OneSignal: notification opened:", notification);
  this._handleNotifications(notification)
});


  }

  _handleNotifications = async (notification) => {
    let data = notification.notification.additionalData
    // console.log('notif clicked:',notification.notification.additionalData)
  }
  render(){

  
  return (
    <View>
      

      <Login/>
    </View>
  )
  }
  }
export default App

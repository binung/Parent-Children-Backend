// npm install --save pusher-js laravel-echo

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

// about typescript
// declare global {
//   interface Window {
//     Pusher: typeof Pusher;
//     Echo: any;
//   }
// }

window.Pusher = Pusher;

const ChildApp = () => {

  // websocket communication using Laravel Echo

  const echo = new Echo({
    broadcaster: 'pusher',
    key: '53bf81f321f9713df1ff',
    cluster: 'mt1',
    forceTLS: true
  });

  const sendData = async () => {
    const apps = await getInstalledApps(); // Your implementation
    const sites = await getVisitedSites(); // Your implementation
    try {
      await axios.post('http://parental.server.digirouble.com/api/socket/child-data', {
        childId: child_user_id,
        apps: apps,
        sites: sites
      });
    } catch (e) {
      console.warn('Error ', e);
    }
  };


  useEffect(() => {
    const childId = 1;
    echo.channel(`child.${childId}`)
      .listen('BlockAppCommand', (appId) => {
        bloackApp(appId);
        console.log(appId);
      });

    window.Echo = echo;

  }, []);

  const getInstalledApps = () => {

  }

  const getVisitedSites = () => {

  }

  const bloackApp = () => {

  }

  return (
    <View>
        <Text>Children App</Text>
    </View>
  );
}

export default ChildApp;

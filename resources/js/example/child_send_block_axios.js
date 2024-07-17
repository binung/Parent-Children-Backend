// npm install --save pusher-js laravel-echo

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Pusher from 'pusher-js/react-native';
import axios from 'axios';

const pusher = new Pusher('53bf81f321f9713df1ff', {
  cluster: 'mt1',
  encrypted: true,
});


const ChildApp = () => {
    const sendData = async () => {
        const apps = await getInstalledApps(); // Your implementation
        const sites = await getVisitedSites(); // Your implementation

        await axios.post('http://parental.server.app.multiplayertv.io/api/socket/child-data', {
            childId: 'child_user_id',
            apps,
            sites,
        });
    };

    useEffect(() => {
        sendData();
    }, []);;

    pusher.subscribe('child.child_user_id').bind('BlockAppCommand', (data) => {
        blockApp(data.appId); // Replace with actual implementation
    });

    return (
        <View>
        <Text>Child App</Text>
        </View>
    );
};

export default ChildApp;

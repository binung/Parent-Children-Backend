// npm install --save pusher-js laravel-echo

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

const echo = new Echo({
    broadcaster: 'pusher',
    key: '53bf81f321f9713df1ff',
    cluster: 'mt1',
    forceTLS: true
});

window.Pusher = Pusher;

const ParentApp = () => {
    const [childData, setChildData] = useState({ apps: [], sites: [] });

    useEffect(() => {
        const parent_user_id = 1;
        echo.channel(`parent.${parent_user_id}`)
          .listen('ChildDataUpdated', (data) => {
            setChildData(data);
            console.log(data);
          });

        window.Echo = echo;

    }, []);

    const blockApp = (appId) => {
        axios.post('http://parental.server.digirouble.com/api/socket/block-app', {
            childId: 'child_user_id',
            appId,
        });
    };

    return (
        <View>
            <Text>Parent App</Text>
        </View>
    );
};

export default ParentApp;

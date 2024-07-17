import React, { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';

const ChildApp = () => {
    const echo = new Echo({
        broadcaster: 'pusher',
        key: '53bf81f321f9713df1ff',
        cluster: 'mt1',
        encrypted: true,
    });

    const sendData = (parentId, apps, sites) => {
        echo.private(`parent.${parentId}`).whisper('ClientChildData', {
        apps,
        sites,
        });
    };

    useEffect(() => {
        const parentId = 'parent_user_id'; // Set your child ID
        const apps = await getInstalledApps(); // Replace with actual implementation
        const sites = await getVisitedSites(); // Replace with actual implementation

        // Send data via Pusher
        sendData(childId, apps, sites);
    }, []);

    pusher.subscribe('child.child_user_id').bind('BlockAppCommand', (data) => {
        blockApp(data.appId); // Replace with actual implementation
    });

    return (
        <View>
        {/* Your UI */}
        </View>
    );
};

export default ChildApp;

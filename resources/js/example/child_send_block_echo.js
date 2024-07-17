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

    // 1. During Initialization or Regular Intervals:** The function can be called in the child app whenever it initializes or at regular intervals (e.g., every few minutes) to send updated data about installed apps and visited sites.
    // 2. User Action:** It can also be triggered by specific user actions, such as after installing a new app or visiting new sites.

    const sendData = (parentId, childId, apps, sites) => {
        echo.private(`parent.${parentId}`).whisper('child-data', {
            childId,
            apps,
            sites,
        });
    };

    useEffect(() => {
        const childId = 'child_user_id'; // Set your child ID
        const parentId = 'parent_user_id'; // Set your parent ID
        const apps = await getInstalledApps(); // Replace with actual implementation
        const sites = await getVisitedSites(); // Replace with actual implementation

        // Send data via Pusher
        sendData(parentId, childId, apps, sites);
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

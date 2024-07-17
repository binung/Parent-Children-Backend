import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { Pusher } from '@pusher/pusher-websocket-react-native';

const pusher = new Pusher('53bf81f321f9713df1ff', {
  cluster: 'mt1',
});

const ChildApp = () => {
  useEffect(() => {
    const fetchData = async () => {
      const apps = await getInstalledApps(); // Replace with actual implementation
      const sites = await getVisitedSites(); // Replace with actual implementation

      axios.post('http://localhost:8000/api/child-data', {
        childId: 'child_user_id',
        apps,
        sites,
      });
    };

    fetchData();
  }, []);

  pusher.subscribe('child.child_user_id').bind('BlockAppCommand', (data) => {
    // Handle block app command
    blockApp(data.appId); // Replace with actual implementation
  });

  return (
    <View>
      <Text>Child App</Text>
    </View>
  );
};

export default ChildApp;

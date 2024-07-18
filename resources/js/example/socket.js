import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import useWebSocket from './useWebSocket';
import axios from 'axios';

const ChildApp = () => {
  const { echo, sendData } = useWebSocket();
  const [childData, setChildData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const apps = await getInstalledApps(); // Replace with actual implementation
      const sites = await getVisitedSites(); // Replace with actual implementation

      // Send data via WebSocket
      sendData('child.child_user_id', 'clent_user_id', {
        childId: 'child_user_id',
        apps,
        sites,
      });

      // Optionally send data to the backend via HTTP
      axios.post('http://your-server-url/api/socket/child-data', {
        childId: 'child_user_id',
        apps,
        sites,
      });
    };

    fetchData();

    // Subscribe to private channel for child data events
    echo.private('child.child_user_id')
      .listenForWhisper('BlockAppCommand', (data) => {
        blockApp(data.appId); // Replace with actual implementation
      });

    // Subscribe to private channel for parent updates
    echo.private('parent.parent_user_id')
      .listen('ChildDataUpdated', (data) => {
        setChildData(data);
      });
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(childData)}</Text>
    </View>
  );
};

export default ChildApp;

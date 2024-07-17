import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import Pusher from 'pusher-js/react-native';

const pusher = new Pusher('53bf81f321f9713df1ff', {
  cluster: 'mt1',
  encrypted: true,
});

const ParentApp = () => {
  const [childData, setChildData] = useState({ apps: [], sites: [] });

  useEffect(() => {
    pusher.subscribe('parent.parent_user_id').bind('ChildDataUpdated', (data) => {
      setChildData(data);
    });
  }, []);

  const blockApp = (appId) => {
    // pusher.send_event('client-block-app', {
    //     parentId: 'parent_user_id',
    //     childId: 'child_user_id',
    //     appId,
    // }, 'private-channel');

    axios.post('http://parental.server.app.multiplayertv.io/api/socket/block-app', {
      parentId: 'parent_user_id',
      childId: 'child_user_id',
      appId,
    });
  };

  return (
    <View>
      <Text>Parent App</Text>
      <FlatList
        data={childData.apps}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Block" onPress={() => blockApp(item.id)} />
          </View>
        )}
      />
      <FlatList
        data={childData.sites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.url}</Text>
            <Button title="Block" onPress={() => blockApp(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ParentApp;

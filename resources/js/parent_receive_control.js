import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import { Pusher } from '@pusher/pusher-websocket-react-native';

const pusher = new Pusher('your-pusher-key', {
  cluster: 'your-pusher-cluster',
});

const ParentApp = () => {
  const [childData, setChildData] = useState({ apps: [], sites: [] });

  useEffect(() => {
    pusher.subscribe('parent.parent_user_id').bind('ChildDataUpdated', (data) => {
      setChildData(data);
    });
  }, []);

  const blockApp = (appId) => {
    axios.post('http://localhost:8000/api/block-app', {
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
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Block" onPress={() => blockApp(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ParentApp;

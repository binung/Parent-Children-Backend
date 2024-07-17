// npm install @pusher/pusher-websocket-react-native
// The snippet below connects to Channels and subscribes to a channel called my‑channel, listening for an event called my‑event.

import {
    Pusher,
    PusherMember,
    PusherChannel,
    PusherEvent,
  } from '@pusher/pusher-websocket-react-native';

  const pusher = Pusher.getInstance();

    await pusher.init({
      apiKey: "53bf81f321f9713df1ff",
      cluster: "mt1"
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: "my-channel",
      onEvent: (event: PusherEvent) => {
        console.log(`Event received: ${event}`);
      }
    });

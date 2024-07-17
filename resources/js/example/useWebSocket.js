import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const useWebSocket = () => {
  // Configure Pusher
  Pusher.logToConsole = true;

  const echo = new Echo({
    broadcaster: 'pusher',
    key: '53bf81f321f9713df1ff',
    cluster: 'mt1',
    encrypted: true,
    forceTLS: true,
  });

  const sendData = (channel, event, data) => {
    echo.channel(channel).whisper(event, data);
  };

  return { echo, sendData };
};

export default useWebSocket;

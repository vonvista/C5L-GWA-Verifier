import { render } from 'react-dom';
import App from './App';
import LoginPage from '../frontend/LoginPage';

render(<LoginPage />, document.getElementById('root'));

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.myPing();

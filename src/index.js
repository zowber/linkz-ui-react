import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Linkz from './Linkz';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Linkz />, document.getElementById('root'));
registerServiceWorker();

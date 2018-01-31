import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import Linkz from './Linkz';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Linkz />, document.getElementById('root'));
registerServiceWorker();
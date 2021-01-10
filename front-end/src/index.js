import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store/store';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './constants/theme';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root'));

serviceWorker.unregister();

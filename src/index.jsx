import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import HeaderView from './components/header-view/header-view';
import { FooterView } from './components/footer-view/footer-view';
import MainView from './components/main-view/main-view';

import moviesApp from './reducers/reducers';

const store = createStore(moviesApp, devToolsEnhancer());

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <HeaderView />
          <div className='py-5 bg-light'>
            <MainView />
          </div>
          <FooterView />
        </Router>
      </Provider>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];
ReactDOM.render(React.createElement(MyFlixApplication), container);

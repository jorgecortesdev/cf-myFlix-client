import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { HeaderView } from './components/header-view/header-view';
import { FooterView } from './components/footer-view/footer-view';
import { MainView } from './components/main-view/main-view';

class MyFlixApplication extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null
    };
  }

  componentDidMount() {
    let username = localStorage.getItem('user');
    if (username !== null) {
      this.setState({
        username: localStorage.getItem('user')
      });
    }
  }

  onLoggedIn(username) {
    this.setState({
      username: username
    })
  }

  render() {
    return (
      <>
        <HeaderView username={this.state.username} />
        <div className='py-5 bg-light'>
          <MainView onLoggedIn={username => this.onLoggedIn(username)} />
        </div>
        <FooterView />
      </>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];
ReactDOM.render(React.createElement(MyFlixApplication), container);

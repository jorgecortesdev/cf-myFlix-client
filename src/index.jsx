import React from 'react';
import ReactDOM from 'react-dom';

import { HeaderView } from './components/header-view/header-view';
import { FooterView } from './components/footer-view/footer-view';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
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
          <Container>
            <MainView onLoggedIn={username => this.onLoggedIn(username)} />
          </Container>
        </div>
        <FooterView />
      </>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

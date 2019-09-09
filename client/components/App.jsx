import React, { Component } from 'react';
import styled from 'styled-components';

const TopBar = styled.div`
  font-size: 40px;
  width: auto;
  height: 50px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
    };
  }

  render() {
    return (
      <TopBar>HELLO WORLD!</TopBar>
    );
  }
}


export default App;

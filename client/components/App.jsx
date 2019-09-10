import React, { Component } from 'react';
import axios from 'axios';

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
      topSubs: [],
    };
  }

  componentDidMount() {
    this.fetchTopSubs();
  }

  fetchTopSubs() {
    axios.get('/top10')
      .then((result) => {
        this.setState({
          topSubs: result.data,
        });
      }).catch((err) => console.log(err));
  }

  render() {
    return (
      <TopBar>HELLO WORLD!</TopBar>
    );
  }
}


export default App;

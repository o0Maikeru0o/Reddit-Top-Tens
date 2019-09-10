import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sub from './SubPanel.jsx';

const TopTensApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
  margin: 0 auto;
  font-family: IBMPlexSans, Arial, sans-serif;
`;

const TopBar = styled.div`
  font-size: 40px;
  width: auto;
  height: 50px;
`;

const SubContainer = styled.div`
  display: block;
  width: 800px;
  height: auto;
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
    const { topSubs } = this.state;
    const subPanels = topSubs.map((sub) => <Sub key={sub.data.id} subData={sub.data} />);

    return (
      <TopTensApp>
        <TopBar>My Top Tens of Reddit</TopBar>
        <SubContainer>{subPanels}</SubContainer>
      </TopTensApp>
    );
  }
}


export default App;

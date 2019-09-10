import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import banner from './assets/reddit-banner.jpg';
import Sub from './SubPanel.jsx';

const TopTensApp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1280px;
  height: auto;
  margin: 0 auto;
  font-family: IBMPlexSans, Arial, sans-serif;
  background-color: #bebebe;
`;

const TopBar = styled.div`
  background: url(${banner});
  background-repeat: no-repeat;
  background-size: cover;
  color: #07b0f0;
  font-size: 65px;
  height: 80px;
  text-align: center;
  text-shadow: 2px 2px 2px black;
  width: 100%;
`;

const SubContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
  width: 98%;
  height: auto;
  list-style: none;
  padding-left: 0;
  background-color: #f6f3d3;
  border-radius: 5px;
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
    axios.get('/top10Subs')
      .then((result) => {
        this.setState({
          topSubs: result.data,
        });
      }).catch((err) => console.log(err));
  }

  render() {
    const { topSubs } = this.state;
    const subPanels = topSubs.map((sub) => <Sub key={sub.data.id} subData={sub.data} />);
    if (!topSubs) {
      return <h1>LOADING...</h1>;
    }
    return (
      <TopTensApp>
        <TopBar>My Top Tens of Reddit</TopBar>
        <SubContainer>{subPanels}</SubContainer>
      </TopTensApp>
    );
  }
}


export default App;

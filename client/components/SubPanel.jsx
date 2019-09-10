import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/fa';
import Post from './PostPanel.jsx';
import defaultIcon from './assets/defaultIcon.svg';

const SubPanelWrapper = styled.div`
  border: 2px solid black;
  border-radius: 5px;
  margin: 5px;
`;

const SubPanel = styled.li`
  display: flex;
  width: 99%;
  height: 10%;
  justify-content: left;
  margin: 5px;
  background-color: #ececec;
  border: 2px solid #a2a1a1;
  border-radius: 20px;
  &:hover {
    background-color: #d8d8d8;
  };
`;
const SubIcon = styled.img`
  flex: none;
  margin: 5px 0px 5px 5px;
  height: 60px;
  width: 60px;
  left: 5px;
  border-radius: 50%;
`;
const SubTitle = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;
const SubDesc = styled.span`
  margin-left: 10px;
  margin-top: 5px;
`;

// const ExpandArrow = styled.FaChevronCircleDown`

// `;

const PostContainer = styled.ul`
  background-color: #ebebeb;
  list-style: none;
  padding-left: 0;
`;

class Sub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      expanded: false,
    };
  }

  componentDidMount() {
    const { display_name } = this.props.subData;
    this.fetchTopPosts(display_name);
  }

  fetchTopPosts(sub) {
    axios.get(`/top10Posts/${sub}`)
      .then((result) => this.setState({ posts: result.data }, console.log('posts', this.state.posts)))
      .catch((err) => console.log(err));
  }

  toggleExpand() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const {
      icon_img, display_name, display_name_prefixed, header_img, public_description,
    } = this.props.subData;
    const { posts, expanded } = this.state;
    const post = posts.map((post) => <Post key={post.data.id} postData={post.data} />);

    return (
      <SubPanelWrapper>
        <SubPanel onClick={() => { this.toggleExpand(); }}>
          <SubIcon src={icon_img || header_img || defaultIcon} alt={`${display_name_prefixed} icon`} />
          <SubTitle href={`https://www.reddit.com/r/${display_name}`}>{display_name_prefixed}</SubTitle>
          <SubDesc>{public_description}</SubDesc>
        </SubPanel>
        {expanded ? <PostContainer>{post}</PostContainer> : null}
      </SubPanelWrapper>
    );
  }
}

export default Sub;

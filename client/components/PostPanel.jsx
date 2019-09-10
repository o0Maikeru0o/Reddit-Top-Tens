import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Comment from './CommentsPanel.jsx'
import redditAlien from './assets/reddit-alien.svg';
const PostPanelWrapper = styled.div`
  border: 2px solid #82d5e5;
  border-radius: 5px;
`;
const PostPanel = styled.div`
  background-color: #d4e6ff;
  border: 2px solid #a2a1a1;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  width: 97%;
  height: 10%;
  margin: 10px;
  &:hover {
    background-color: #a1cedb;
  };
`;
const PostIcon = styled.img`
  flex: none;
  height: 60px;
  width: 60px;
  left: 5px;
  margin-right: 5px;
  border-radius: 5px;
`;
const PostTitle = styled.a`
    color: black;
    height: auto;
    font-size: 18px;
    height: auto;
    margin-left: 5px;
    text-decoration:none;
    &:hover {
      cursor:pointer;
      color: #046dff;
    }
`;

const CommentContainer = styled.ul`
  background-color: #ebebeb;
  list-style: none;
  padding-left: 0;
`;

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      expanded: false,
    };
  }

  componentDidMount() {
    const { subreddit, id } = this.props.postData;
    this.fetchTopComments(subreddit, id);
  }

  fetchTopComments(sub, id) {
    axios.get('/top10Comments/', { params: { sub, id } })
      .then((result) => this.setState({ comments: result.data }))
      .catch((err) => console.log(err));
  }

  toggleExpand() {
    console.log('clicked')
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const {
      title, id, thumbnail, author, num_comments, score, created, permalink
    } = this.props.postData;
    const { comments, expanded } = this.state;
    const comment = comments.map((comment) => <Comment key={comment.data.id} commentData={comment.data} />);
    console.log(comment)
    return (
      <PostPanelWrapper>
        <PostPanel onClick={() => this.toggleExpand()}>
          <PostIcon src={thumbnail || redditAlien} alt="Post Image" />
          <div>
          <PostTitle target="_blank" href={`https://www.reddit.com/${permalink}`}>{title}</PostTitle>
          </div>
        </PostPanel>
        {expanded ? <CommentContainer>{comment}</CommentContainer> : null}
      </PostPanelWrapper>
    );
  }
}

export default Post;

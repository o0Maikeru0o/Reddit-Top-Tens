import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Comment from './CommentsPanel.jsx'
import redditAlien from './assets/reddit-alien.svg';

const PostPanelWrapper = styled.div`
  border: 2px solid #82d5e5;
  border-radius: 5px;
  dsiplay: flex;
  justify-content: center;
  align-content: center;
`;

const PostPanel = styled.div`
  background-color: #d4e6ff;
  border: 2px solid #a2a1a1;
  border-radius: 10px;
  display: flex;
  height: 10%;
  margin: 5px;
  padding: 5px;
  width: 98%;
  &:hover {
    background-color: #a1cedb;
  };
  &:
`;
const PostIcon = styled.img`
  flex: none;
  height: 70px;
  width: 70px;
  margin-right: 5px;
  border-radius: 5px;
  &:hover {
    transform: scale(4);
  }
  `;

const PostAuthor = styled.div`
    color: black;
    font-size: 19px;
    width: 20%;
  `;

const PostTitle = styled.a`
    color: black;
    font-size: 20px;
    text-align: center;
    text-decoration:none;
    margin-right: 15px;
    &:hover {
      cursor:pointer;
      color: #046dff;
    }
`;

const PostStats = styled.div`
  margin-left:auto;
  margin-right:0;
  display: block;
  color: #01f;
`;

const CommentContainer = styled.div`
  display: block;
  background-color: #ebebeb;
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
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  render() {
    const {
      title, id, preview, thumbnail, author, num_comments, score, created, permalink
    } = this.props.postData;
    const { comments, expanded } = this.state;
    const comment = comments.map((comment) => <Comment key={comment.data.id} commentData={comment.data} />);
    return (
      <PostPanelWrapper>
        <PostPanel onClick={() => this.toggleExpand()}>
          <PostIcon src={ thumbnail || redditAlien} alt="Post Image" />
          <PostAuthor >{author}</PostAuthor>
            <PostTitle target="_blank" href={`https://www.reddit.com/${permalink}`}>{title}</PostTitle>
          <PostStats>
          <div>Comments:{num_comments}</div>
          <div>Score:{score}</div>
          </PostStats>
        </PostPanel>
        {expanded ? <CommentContainer>{comment}</CommentContainer> : null}
      </PostPanelWrapper>
    );
  }
}

export default Post;

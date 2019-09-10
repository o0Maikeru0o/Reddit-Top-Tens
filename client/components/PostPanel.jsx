import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import redditAlien from './assets/reddit-alien.svg';

const PostPanel = styled.div`
  background-color: #d4e6ff;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  width: 95%;
  height: 10%;
  margin: 10px;
`;
const PostIcon = styled.img`
  height: 60px;
  width: 60px;
  left: 5px;
  border-radius: 5px;
`;
const PostTitle = styled.a`
  color: black;
  margin-left: 10px;
  font-size: 20px;
  text-decoration: none;
  &:hover: {
    color: #046dff;
    text-decoration:none;
    cursor:pointer;
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
      .then((result) => result.data)
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
      title, id, thumbnail, author, num_comments, score, created, permalink
    } = this.props.postData;
    const { comments, expanded } = this.state;
    const comment = comments.map((comment) => <Post key={comment.data.id} postData={comment.data} />);

    return (
      <>
        <PostPanel onClick={() => { this.toggleExpand(); }}>
          <PostIcon src={thumbnail || redditAlien} alt="Post Image" />
          <PostTitle target="_blank" href={`https://www.reddit.com/${permalink}`}>{title}</PostTitle>
        </PostPanel>
        {expanded ? <CommentContainer>{comment}</CommentContainer> : null}
      </>
    );
  }
}

export default Post;

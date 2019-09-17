import React, { Component } from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside';
import { FaChevronCircleRight } from 'react-icons/fa';
import Comment from './CommentsPanel.jsx';
import redditAlien from './assets/reddit-alien.svg';

const PostPanel = styled.div`
  background-color: #d4e6ff;
  border: 3px solid #a2a1a1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 10%;
  margin: 5px;
  padding: 5px;
  width: 98%;
  &:hover {
    background-color: #a1cedb;
  };
  `;

const PostConent = styled.div`
  min-height: 80px;
  display: inline-flex;
  border: 2px solid #82d5e5;
  border-radius: 5px;
`;

const PostIcon = styled.img`
  max-height: 70px;
  max-width: 70px;
  height: auto;
  margin: 5px;
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
    font-size: calc(12px + .5vw);
    text-align: center;
    text-decoration:none;
    margin-right: 15px;
    padding-top: 5px;
    &:hover {
      cursor:pointer;
      color: #046dff;
    }
`;

const PostStats = styled.div`
  margin-left: auto;
  padding-top: 7px;
  font-size: 0.8vw;
  color: #01f;
`;

const ExpandArrow = styled(posed.div({
  open: {
    rotate: 90,
  },
  closed: {
    rotate: 0,
  },
}))`
  position: relative;
  width: 17px;
  height: 17px;
  right: 3px;
  margin-bottom: 3px;
  align-self: flex-end;
`;

const Arrow = styled(FaChevronCircleRight)`
width: 17px;
height: 17px;
`;

const CommentContent = posed(Comment)({
  enter: { height: '100%' },
  exit: { height: 0 },
});

const CommentContainer = styled.div`
  display: block;
  background-color: #d4e6ff;
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

  handleClickOutside() {
    this.setState({
      expanded: false,
    });
  }

  render() {
    const {
      title, id, preview, thumbnail, author, num_comments, score, created, permalink,
    } = this.props.postData;
    const { comments, expanded } = this.state;
    const comment = comments.map((comment) => <CommentContent key={comment.data.id} commentData={comment.data} />);

    return (
      <PostPanel ref={this.props.innerRef}>
        <PostConent onClick={() => this.toggleExpand()}>
          <PostIcon src={thumbnail || redditAlien} alt="Post Image" />
          <PostAuthor>{author}</PostAuthor>
          <PostTitle target="_blank" href={`https://www.reddit.com/${permalink}`}>{title}</PostTitle>
          <PostStats>
            <div>
Comments:
              {' '}
              {num_comments}
            </div>
            <div>
Score:
              {' '}
              {score}
            </div>
          </PostStats>
          <ExpandArrow pose={expanded ? 'open' : 'closed'}>
            <Arrow />
          </ExpandArrow>
        </PostConent>
        <CommentContainer>
          <PoseGroup>
            {expanded && comment }
          </PoseGroup>
        </CommentContainer>
      </PostPanel>
    );
  }
}

Post = onClickOutside(Post);

export default React.forwardRef((props, ref) => (
  <Post
    innerRef={ref}
    {...props}
  />
));

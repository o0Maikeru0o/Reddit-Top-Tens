import React from 'react';
import styled from 'styled-components';

const CommentPanel = styled.div`
  background-color: #dfffea;
  border: 3px solid #a2a1a1;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  width: 97%;
  height: 10%;
  margin: 10px;
  &:hover {
    background-color: #a1cedb;
  };
`;

const CommentAuthor = styled.span`
  color: black;
  margin-left: 10px;
  font-size: 20px;
`;

const CommentText = styled.p`
  color: black;
  margin-left: 10px;
  font-size: 18px;
`;

const CommentScore = styled.div`
  display: block;
  text-align: center;
  color: #01f;
  font-size: 17px;
`;

const Comment = (props) => {
  const {
    body, author, score, created,
  } = props.commentData;

  return (
    <CommentPanel ref={props.innerRef}>
      <CommentAuthor>{author}</CommentAuthor>
      <CommentText>{body}</CommentText>
      <CommentScore>
        <div>Score</div>
        <div>{score}</div>
      </CommentScore>
    </CommentPanel>
  );
};


export default React.forwardRef((props, ref) => (
  <Comment
    innerRef={ref}
    {...props}
  />
));

import React from 'react';
import styled from 'styled-components';

const CommentPanel = styled.li`
  background-color: #dfffea;
  border: 3px solid #a2a1a1;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  width: 97%;
  height: 10%;
  margin: 10px;
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
  color: black;
  font-size: 20px;
`;

const Comment = (props) => {
  console.log(props)
  const {
    body, author, score, created
  } = props.commentData;

  return (
    <CommentPanel>
      <CommentAuthor>{author}</CommentAuthor>
      <CommentText>{body}</CommentText>
      <CommentScore>
        <div>Upvotes</div>
        <div>{score}</div>
      </CommentScore>
    </CommentPanel>
  );
};


export default Comment;

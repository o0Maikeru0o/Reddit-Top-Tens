import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import defaultIcon from './defaultIcon.svg';

const SubPanel = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  margin: 10px;
`;
const SubIcon = styled.img`
  height: 60px;
  width: 60px;
  left: 5px;
`;
const SubTitle = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;
const SubDesc = styled.span`
  margin-left: 10px;
  margin-top: 5px;
`;

const Sub = ({ subData }) => {
  const [posts, setPosts] = useState([]);
  const {
    icon_img, display_name_prefixed, header_img, public_description,
  } = subData;

  const fetchTopPosts = (sub) => {
    axios.get(`/top10Posts${sub}`)
      .then((result) => {
        setPosts(posts[result.data]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <SubPanel>
      <SubIcon src={icon_img || header_img || defaultIcon} alt={`${display_name_prefixed} icon`} />
      <SubTitle>{display_name_prefixed}</SubTitle>
      <SubDesc>{public_description}</SubDesc>
    </SubPanel>
  );
};

export default Sub;

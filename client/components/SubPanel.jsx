import React, { Component } from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import axios from 'axios';
import onClickOutside from 'react-onclickoutside';
import { FaChevronCircleRight } from 'react-icons/fa';
import Post from './PostPanel.jsx';
import defaultIcon from './assets/defaultIcon.svg';


const SubPanel = styled.div`
  background-color: #e4c3d3;
  border: 3px solid #a2a1a1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 10%;
  margin: 5px;
  padding: 5px;
  width: 98%;
    &:hover {
      background-color: #e6adad;
  };
`;

const SubConent = styled.div`
  display: inline-flex;
  min-height: 80px;
  border: 2px solid black;
  border-radius: 5px;
`;

const SubIcon = styled.img`
  margin: 5px 0px 5px 5px;
  max-height: 70px;
  max-width: 70px;
  left: 5px;
  border-radius: 50%;
`;
const SubTitle = styled.div`
  width: 10%;
  margin-left: 10px;
  font-size: 20px;
`;

const SubDesc = styled.div`
  align-self: center;
  margin-top: 5px;
  margin-left: 30px;
  font-size: 20px;
  max-width: 850px;
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

const SubStats = styled.div`
  height: 40px;
  margin-left: auto;
  padding-top: 7px;
  color: #01f;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: #e4c3d3;
  padding-left: 0;
`;

const PostContent = posed(Post)({
  enter: { height: '100%' },
  exit: {
    height: 0,

  },
});

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
      .then((result) => this.setState({ posts: result.data }))
      .catch((err) => console.log(err));
  }

  toggleExpand() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  handleClickOutside(e) {
    this.setState({
      expanded: false,
    });
  }

  render() {
    const {
      icon_img, display_name, display_name_prefixed, header_img, public_description, subscribers,
    } = this.props.subData;
    const { posts, expanded } = this.state;
    const content = posts.map((post) => <PostContent key={post.data.id} postData={post.data} />);

    return (

      <SubPanel>
        <SubConent onClick={() => { this.toggleExpand(); }}>
          <SubIcon src={icon_img || header_img || defaultIcon} alt={`${display_name_prefixed} icon`} />
          <SubTitle href={`https://www.reddit.com/r/${display_name}`}>{display_name_prefixed}</SubTitle>
          <SubDesc>{public_description}</SubDesc>
          <SubStats>
            <div>Subscribers</div>
            <div>{subscribers}</div>
          </SubStats>
          <ExpandArrow pose={expanded ? 'open' : 'closed'}>
            <Arrow />
          </ExpandArrow>
        </SubConent>
        <PostContainer>
          <PoseGroup>
            {expanded && content}
          </PoseGroup>
        </PostContainer>
      </SubPanel>
    );
  }
}

export default onClickOutside(Sub);

import React, { PureComponent } from 'react';
import {withRouter} from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import {getQuery, getComponent} from '@utils/index';
import Loader from './Loader';

class FooterTabBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
      instance: null,
    };
  }

  componentDidMount() {
    this.renderContent('home');
    // this.props.history.push('/app/home');
  }

  changeTabFn = (tab) => {
    this.props.history.push('/app/'+ tab)
    this.setState({
      selectedTab: tab,
    });
  }
  renderContent(pageText) {
    console.log('location:', this.props)
    return <Loader path={this.props.location.pathname} query={getQuery(this.props.location.search)} import={getComponent} {...this.props}/>
  }
  
  render() {
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 60 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="Life"
            key="home"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'home'}
            badge={1}
            onPress={() => {
              this.changeTabFn('home')
            }}
            data-seed="logId"
          >
            {/* <ListViewInfos /> */}
            {this.renderContent('Home')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="Topics"
            key="topics"
            badge={'new'}
            selected={this.state.selectedTab === 'topics'}
            onPress={() => {
              this.changeTabFn('topics')
            }}
            data-seed="logId1"
          >
            {this.renderContent('topics')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="Friend"
            key="friend"
            dot
            selected={this.state.selectedTab === 'friend'}
            onPress={() => {
              this.changeTabFn('friend')
            }}
          >
            {this.renderContent('friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="My"
            key="user"
            selected={this.state.selectedTab === 'user'}
            onPress={() => {
              this.changeTabFn('user')
            }}
          >
            {this.renderContent('user')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(FooterTabBar);
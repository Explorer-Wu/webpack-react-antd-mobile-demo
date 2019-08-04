import React, { PureComponent } from 'react';
import { matchRoutes, renderRoutes } from "react-router-config";
import { withRouter } from 'react-router-dom';
import routes from '@router/routesConfig'
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

  // componentDidMount() {
  //   this.renderContent('home');
  //   // this.props.history.push('/app/home');
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.selectedTab !== this.state.selectedTab) {
  //     // this.renderContent(prevState.selectedTab);
  //     this.renderContent(this.state.selectedTab);
  //   }
  // }

  changeTabFn = (tab) => {
    this.props.history.push('/views/'+ tab)
    this.setState({
      selectedTab: tab,
    });
  }

  renderContent(pageText) {
    const { match } = this.props
    console.log('renderContent:', this.props)
    // if (pageText === this.state.selectedTab) {
    //   console.log('pageText:', pageText)
    //   return <div key={pageText}>{renderRoutes(routes, match)}</div>
    // } else {
    //   return null
    // }  
    return <div key={pageText}>{renderRoutes(routes, match)}</div>
  }
  
  render() {
    const { match } = this.props
    return (
      <div style={{ position: 'fixed', width: '100%', height: '60px', bottom: 0}}>
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
            {/* {(this.state.selectedTab === 'home'? this.renderContent('home'): null)} */}
            {/* {this.renderContent('home')} */}
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
            {/* {(this.state.selectedTab === 'topics'? this.renderContent('topics') : null)} */}
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
            {/* {(this.state.selectedTab === 'friend'? this.renderContent('friend') : null)} */}
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
            {/* {(this.state.selectedTab === 'user'? this.renderContent('user') : null)} */}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(FooterTabBar);
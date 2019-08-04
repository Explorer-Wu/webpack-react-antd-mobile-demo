
import React, {Component} from 'react';
// import history from '@router/history'
import { withRouter } from 'react-router-dom';
import { renderRoutes } from "react-router-config";
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile';
import routes from '@router/routesConfig'
import HeaderNav from '@components/Header';
import FooterTabBar from '@components/Footer';
import 'public/static/css/normalize.css';
// import 'antd-mobile/dist/antd-mobile.css'; 
import 'public/static/css/main.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
        this.menuData = [
          {
            value: '/app/user',
            label: '用户',
          }, {
            value: '/app/todo',
            label: 'ToDo',
          },
          {
            value: '/app/topics',
            label: 'Topics',
            isLeaf: true,
          },
        ];
    }

    render() {
        const { match } = this.props
        return (
          <div className="flex-container">
            {/* <div className="sub-title">Basic</div> */}
            <HeaderNav menuData={this.menuData}></HeaderNav>
            {/* <Flex>
              <Flex.Item>  </Flex.Item>  
              <Flex.Item>  </Flex.Item>
            </Flex> */}
            <div style={{ marginTop: 50 }}>
              {renderRoutes(routes[0].routes, match)}
            </div>
            <FooterTabBar></FooterTabBar>
          </div>                  
        );
    }
}

export default App;


import React, {Component} from 'react';
// import history from '@router/history'
// import { BrowserRouter as Router } from 'react-router-dom';
import { matchRoutes, renderRoutes } from "react-router-config";
import { Flex, WhiteSpace } from 'antd-mobile';
import Header from '@components/Header';
import FooterTabBar from '@components/Footer';
import 'public/static/css/normalize.css';
// import 'antd-mobile/dist/antd-mobile.css'; 
import 'public/static/css/main.css'
// import renderRoutes from '@router/index'
// import routes from '@router/routesConfig'

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
          <>
            {/* <div className="sub-title">Basic</div> */}
            <Header menuData={this.menuData}></Header>
            {/* <Flex>
              <Flex.Item>  </Flex.Item>  
              <Flex.Item>  </Flex.Item>
            </Flex> */}
            {/* {renderRoutes(routes, match)} */}
            <FooterTabBar></FooterTabBar>
            
          </>                  
        );
    }
}

export default App;

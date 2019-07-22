import React, {PureComponent} from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class NavMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys: [],
            menuLis: [{
                type: 'dashboard',
                title: '概览',
                path: '/app/home'
            }, {
                type: 'user',
                title: '用户',
                path: '/app/user'
            }, {
                type: 'todo',
                title: 'ToDo',
                path: '/app/todo'
            }, {
                type: 'topics',
                title: 'Topics',
                children: [{
                    title: 'Topic列表',
                    path: '/app/topics'
                }]
            }],
        }
    }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     // Capture the current height of the list so we can adjust scroll later.
    //     if (prevProps.location.pathname !== this.props.location.pathname) { 
    //         this.setState({ selectedKeys: [this.props.location.pathname]});
    //     }
    //     return null;
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.setState({ selectedKeys: [this.props.location.pathname]});
        }
    }

    componentDidMount() {
        console.log("props.location1:", this.props)
        this.setState({ selectedKeys: [this.props.location.pathname]});
    }

    linkTo = (link) => {
        console.log("linkTo:", link.key, this.props.history)
        this.props.history.push(link.key);
    }

    render() {
        console.log("menuLis:", this.state)

        let MenuList = this.state.menuLis.map((item, index) => item.children ? (
            <SubMenu key={"sub"+ index+1} title={<span><Icon type={item.type}/><span>{item.title}</span></span>}>
                {item.children.map((chd) => (<Menu.Item key={chd.path}><span>{chd.title}</span></Menu.Item>))}
            </SubMenu>
        ): (<Menu.Item key={item.path}><Icon type={item.type}/><span>{item.title}</span></Menu.Item>))

        return (
            <Menu theme="dark" defaultSelectedKeys={['/app/home']} selectedKeys={this.state.selectedKeys} onClick={this.linkTo} mode="inline">
            {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> */}
                { MenuList }
            </Menu>
        );
    }
}

export default withRouter(NavMenu);

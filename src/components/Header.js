import React, { PureComponent } from 'react';
import { Drawer, List, Menu, ActivityIndicator, NavBar, Icon } from 'antd-mobile';
import logo from 'public/static/images/logo.svg';
// import { Link } from 'react-router-dom';props.
// import { BrowserRouter, Route, Link } from 'react-router-dom'

export class HeadTop extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          initData: '',
          show: false,
        };
    }
    onChange = (value) => {
        let label = '';
        this.props.menuData.forEach((dataItem) => {
          if (dataItem.value === value[0]) {
            label = dataItem.label;
            if (dataItem.children && value[1]) {
              dataItem.children.forEach((cItem) => {
                if (cItem.value === value[1]) {
                  label += ` ${cItem.label}`;
                }
              });
            }
          }
        });
        console.log(label);
    }
    
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
          show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
          setTimeout(() => {
            this.setState({
              initData: this.props.menuData,
            });
          }, 500);
        }
    }
    
    onMaskClick = () => {
        this.setState({
          show: false,
        });
    }
    
    render() {
        const { initData, show } = this.state;
        const menuEl = (
          <Menu
            className="single-foo-menu"
            data={initData}
            value={['1']}
            level={1}
            onChange={this.onChange}
            height={document.documentElement.clientHeight * 0.6}
          />
        );
        const loadingEl = (
          <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </div>
        );

        return (
          <div className={show ? 'single-menu-active' : ''}>
            <div>
                <NavBar
                    mode="dark"
                    // icon={<Icon type="left" />}
                    leftContent="Menu"
                    icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                    onLeftClick={this.handleClick}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                    className="single-top-nav-bar"
                >
                    OneLevel menu
                </NavBar>
            </div>
            {show ? initData ? menuEl : loadingEl : null}
            {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
          </div>
        )
    }
}

export default HeadTop;
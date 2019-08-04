import React, { PureComponent } from 'react';
import { NavBar, Icon, Menu, ActivityIndicator, SearchBar, Button, Drawer, List, Popover } from 'antd-mobile';
import logo from 'public/static/images/logo.svg';
// import { Link } from 'react-router-dom';props.
// import { BrowserRouter, Route, Link } from 'react-router-dom'
const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

export class HeaderNav extends PureComponent {
    constructor(...args) {
      super(...args);
      this.state = {
        initData: '',
        show: false,
        visible: false,
        selected: '',
      };
    }
  
    onChange = (value) => {
      let label = '';
      console.log("menuData:", this.props.menuData);
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
  
    onSelect = (opt) => {
      // console.log(opt.props.value);
      this.setState({
        visible: false,
        selected: opt.props.value,
      });
    }
  
    handleVisibleChange = (visible) => {
    console.log("visible:", visible);
      this.setState({
        visible
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
          <div className={show ? 'single-menu-active' : ''} style={{ position: 'fixed', width: '100%', height: '50px', top: 0, zIndex: 1000}}>
            <NavBar
              leftContent="Menu"
              // icon={<Icon type="left" />}
              icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
              mode="dark"
              onLeftClick={this.handleClick}
            rightContent={[
                // <SearchBar
                //   key="right01" 
                //   placeholder="Search"
                //   onClear={value => console.log(value, 'onClear')}
                //   // onFocus={() => console.log('onFocus')}
                //   // onBlur={() => console.log('onBlur')}
                //   // onCancel={() => console.log('onCancel')}
                //   // showCancelButton
                //   style={{width: '100%'}}
                // />,
                <Icon key="right01" type="search" style={{ marginRight: '16px' }} />,
                <Popover key="right02" mask
                  overlayClassName="fortest"
                  overlayStyle={{ color: 'currentColor' }}
                  visible={this.state.visible}
                  overlay={[
                    (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
                    (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
                    (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                      <span style={{ marginRight: 5 }}>Help</span>
                    </Item>),
                  ]}
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                  }}
                  onVisibleChange={this.handleVisibleChange}
                  onSelect={this.onSelect}
                >
                  <div style={{
                    height: '100%',
                    // padding: '0 15px',
                    // marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <Icon type="ellipsis" />
                  </div>
                </Popover>
              ]}
              className="single-top-nav-bar"
            >
            </NavBar>
            
            {show ? initData ? menuEl : loadingEl : null}
            {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
          </div>
        )
    }
}

export default HeaderNav;
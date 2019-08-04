import React, {Component} from 'react';
import { Carousel, WingBlank } from 'antd-mobile';


class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['1', '2', '3', '4','5'],
      imgHeight: 200,
    }
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['techIntro.mp4', 'jiangnanminglou.mp4', 'reactlifefunctionbefore.jpg', 'reactlifefunctionafter.jpg', 'jiangnanminglou.jpg']
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <Carousel
          // className="my-carousel"
          autoplay={false} //是否自动切换
          infinite={true}//是否循环播放
          dots={true} //是否显示面板指示点
          selectedIndex={0}
          swipeSpeed={35}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {/* {this.state.data.filter(data => /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(data)).map(val => 
            (<div
              key={val}
              style={{ display: 'inline-block', width: '100%', overflow: 'auto' }}
            ><video 
              src={require(`public/static/media/${val}`)} 
              width="100%" height={this.state.imgHeight} controls="controls" autoplay="autoplay" preload="auto"
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
              >
              Your browser does not support the video tag.
            </video>
            </div>) 
          )} */}
              
          {this.state.data.map(val => {
              if(/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(val)){
                return (<a 
                href="javascript:void(0)"
                key={val}
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={require(`public/static/images/${val}`)}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>)
              } else if(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(val)){
                return (<div
                  key={val}
                  style={{ display: 'inline-block', width: '100%', overflow: 'auto' }}
                ><video 
                  src={require(`public/static/media/${val}`)} 
                  width="100%" height={this.state.imgHeight} controls="controls" autoplay="autoplay" preload="auto"
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                  >
                  Your browser does not support the video tag.
                </video>
                </div>)
              } else {
                return null
              }
            }
          )}
        </Carousel>
      </WingBlank>
    );
  }
}

export default Topics;
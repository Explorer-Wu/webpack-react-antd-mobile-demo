import React, {Component} from 'react';
import logo from 'public/static/images/logo.svg';

class Todo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        count: 0,
        reducer: 1
      };
      // This binding is necessary to make `this` work in the callback
      this.addCount = this.addCount.bind(this);
    }
  
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
  
    tick() {
        this.setState({
            date: new Date()
        });
    }
  
    addCount() {
        this.setState((prevState, props) => ({
            count: ++prevState.count //+ props.increment
        }));
    }
  
    preventCout(reducer, e) {    //事件对象e要放在最后
        e.preventDefault();
        this.setState((prevState) => ({
            counter: prevState.counter - reducer
        }));
    }
  
    render() {
      return (
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          {/* <LoginControl user={this.props.author}/> */}
          
          当前计数：{this.state.count}<br/>
  
          <button onClick={this.addCount}>add</button><br/>
          <a href="https://reactjs.org" onClick={this.preventCout.bind(this, this.state.reducer)}>Reduce</a>
          
          {/* <MesList messages={this.props.unreadMessages} />, */}
          <p className="App-intro">
              {this.props.text}, To get started, edit <code>src/App.js</code> and save to reload.<br/>
              当前时间： {this.state.date.toLocaleTimeString()} <br/>
              计数：{this.state.counter}
          </p>
        </div>
      )
    }
  }
  
  export default Todo;
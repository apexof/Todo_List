import React from 'react';
import Button from './Button';

class Stopwatch extends React.Component {
  state = {
    running: false,
    elapsed: 0,
    lastTick: 0
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    if (this.state.running){
      let now = Date.now();
      let diff = now - this.state.lastTick;

      this.setState({
        elapsed: this.state.elapsed + diff,
        lastTick: now
      });
    }
  }

  handleStart = () => {
    this.setState({ 
      running: true,
      lastTick: Date.now(),
    });
  }

  handlePause = () => {
    this.setState({ running: false });
  }

  handleStop = () => {
    this.setState({ 
      running: false,
      elapsed: 0,
      lastTick: 0      
    });
  }

  format(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let m = Math.floor(totalSeconds / 60);
    m = (m > 9) ? m : '0' + m;
    let s = totalSeconds % 60;
    s = (s > 9) ? s : '0' + s;
    return m + ':' + s;
  }

  render() {
    let time = this.format(this.state.elapsed);
    return (
      <section className="stopwatch">
        <div className="stopwatch-time">{time}</div>

        <div className="stopwatch-controls">
          {this.state.running ?
            <Button className="icon" icon="pause" onClick={this.handlePause} />
          :
            <Button className="icon" icon="play_arrow" onClick={this.handleStart} />
          }

          <Button className="icon" icon="stop" onClick={this.handleStop} />
        </div>
      </section>
    );
  }
}

export default Stopwatch;
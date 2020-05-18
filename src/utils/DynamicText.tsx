import React from 'react';


interface IProps {
    value: number
    onChange: (v: number) => void;
    min: number
    max: number
    step: number
    pixelDistance: number
    className: string
    onInput: (v: number) => void
    format: (v: number) => string
    disabled: boolean
}

interface IState {
  value: number
}

class DynamicText extends React.Component<IProps, IState> {

  __isMouseDown = false
  dragged = false
  startX = 0
  startValue = 0

  static defaultProps = {
      min: 0,
      max: Infinity,
      step: 1,
      pixelDistance: null,
      className: 'input',
      format: function(x) { return x; },
      onInput: function() { },
      disabled: false
  }

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    }

    this.__isMouseDown = false;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  bounds(num) {
    num = Math.max(num, this.props.min);
    num = Math.min(num, this.props.max);
    return num;
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onBlur(e) {
    var parsed = this.state.value; //parseFloat(this.state.value);
    if (isNaN(parsed)) {
      this.setState({ value: this.props.value });
    } else {
      this.props.onChange(this.bounds(parsed));
      this.setState({ value: this.bounds(parsed) });
    }
  }

  onMouseMove(e) {
    var change;
    if (this.props.pixelDistance > 0) {
      change = Math.floor((this.startX - e.screenX) / this.props.pixelDistance);
    } else {
      change = this.startX - e.screenX;
    }
    this.dragged = true;
    var value = this.bounds(this.startValue - (change * this.props.step));
    this.setState({ value: value });
    this.props.onInput(value);
  }

  onMouseDown(e) {
    // short circuit if currently editing number
    if (e.target === document.activeElement || e.button !== 0) return;
    this.__isMouseDown = true;

    e.preventDefault();

    this.dragged = false;
    this.startX = e.screenX;
    this.startValue = this.state.value;

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp(e) {
    if (this.__isMouseDown) {
      e.preventDefault();
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      if (this.dragged) {
        this.onBlur(e);
      }
      this.__isMouseDown = false;
    }
  }

  onDoubleClick(e) {
    e.target.focus();
  }

  onKeyDown(e) {
    var value;
    if (e.which == 38) {
      // UP
      e.preventDefault();
      value = this.state.value + this.props.step;
      this.setState({ value: value });
      this.props.onInput(value);
    } else if (e.which == 40) {
      // DOWN
      e.preventDefault();
      value = this.state.value - this.props.step;
      this.setState({ value: value });
      this.props.onInput(value);
    } else if (e.which == 13) {
      // ENTER
      this.onBlur(e);
      e.target.blur();
    }
  }

  render() {
    return (
      <input
        className={this.props.className}
        disabled={this.props.disabled}
        type='text'
        onChange={this.onChange}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onMouseUp={this.onMouseUp}
        onDoubleClick={this.onDoubleClick}
        onBlur={this.onBlur}
        value={this.props.format(this.state.value)} />
    );
  }
}

export default DynamicText;

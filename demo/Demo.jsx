import React from 'react';
import { QRCode } from '../src/index';

const logo = (
  <svg height="9" viewBox="-20 -30 220 220" width="9">
    <g fill="none" fillRule="evenodd" stroke="none" stroke-Width="1">
        <g transform="translate(45.000000, 79.000000)">
            <polygon fill="#000000" points="45.1 0.1 0 78.2 90.3 78.2 135.4 0"/>
        </g>
        <g transform="translate(30.000000, 53.000000)">
            <polygon fill="#FFFFFF" points="0.0501708984 78.1858521 8 91.2 98.3 91.2 143.4 13 135.327159 0.0268729573"/>
            <polygon fill="#000000" points="45.1 0.1 0 78.2 90.3 78.2 135.4 0"/>
        </g>
        <g>
            <polygon fill="#FFFFFF" points="0.0352172852 78.7047729 8 92.2 98.3 92.2 143.4 14 135.446439 0.51429416"/>
            <polygon fill="#000000" points="45.1 0.6 0 78.7 90.3 78.7 135.4 0.5"/>
        </g>
    </g>
</svg>
);

class Demo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 'Try changing the values and see the code update in real-time!',
      level: 'L',
      bgColor: '#FFFFFF',
      fgColor: '#000000',
    };
  }

  updateValue = e => this.setState({ ...this.state, value: e.target.value });
  updateLevel = e => this.setState({ ...this.state, level: e.target.value });
  updateBgColor = e => this.setState({ ...this.state, bgColor: e.target.value });
  updateFgColor = e => this.setState({ ...this.state, fgColor: e.target.value });

  render() {
    const { state, updateValue, updateLevel, updateBgColor, updateFgColor } = this;
    return (<div>
      <form className="pure-form pure-form-stacked">
        <fieldset>
          <div className="pure-g">
            <div className="pure-u-1">
              <label htmlFor="value">Value</label>
              <textarea className="pure-input-1" id="value" onChange={updateValue} type="text" value={state.value} />
            </div>
            <div className="pure-u-1-3"><label htmlFor="level">Level</label>
              <select id="level" onChange={updateLevel}>
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="Q">Q</option>
                <option value="H">H</option>
              </select>
            </div>
            <div className="pure-u-1-3">
              <label htmlFor="fgColor">Foregroud</label>
              <input id="fgColor" onChange={updateFgColor} type="color" value={state.fgColor} />
            </div>
            <div className="pure-u-1-3">
              <label htmlFor="bgColor">Background</label>
              <input id="bgColor" onChange={updateBgColor} type="color" value={state.bgColor} />
            </div>
          </div>
        </fieldset>
      </form>
      <div className="qrcode">
        <QRCode
          bgColor={state.bgColor}
          fgColor={state.fgColor}
          image={logo}
          imageSize={9}
          level={state.level}
          style={{ width: 500 }}
          value={state.value}
        />
      </div>
    </div>);
  }
}

export default Demo;

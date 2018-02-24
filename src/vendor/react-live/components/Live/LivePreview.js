import React, { createElement } from 'react'
import { LiveContextTypes } from './LiveProvider'
import cn from '../../utils/cn'

class LivePreview extends React.Component {

  constructor() {
    super();
    this.state= { error: false };
  }

  componentDidCatch(error, info) {
    //console.log(this.context);
    this.setState({ error: true, desc:error.toString() })
  }

  componentWillReceiveProps(next, context) {
     this.setState({ error: false })
  }

  displayError() {
    if (this.context.live.error||this.state.error)
      return (
        <div key="1">
          <div className="alert alert-danger mt-1">
            <pre>
              {this.context.live.error || this.state.desc}
            </pre>
          </div>
        </div>
      );
  }

  render() {
    const { className, ...rest } = this.props, { live: { element }} = this.context;
    //const checkbox = <label key="0" className="align-self-center custom-control custom-checkbox mr-0">
    //        <input
    //          name="live"
    //          type="checkbox"
    //          className="custom-control-input"
    //          checked={this.state.isOn}
    //          onChange={this.handleLive}
    //        />            <span className="custom-control-indicator"></span>
    //        <span className="custom-control-description">Live Preview</span>
    //      </label>;
    return [
      this.displayError(),
      (this.context.live.error||this.state.error)?void 0 : (
      <div
        {...rest}
        className={cn('react-live-preview', className)}
        key="2"
      >
        {
          typeof element === 'function' ?
            createElement(element) :
            element
        }
      </div>
    )]
  }
}

LivePreview.contextTypes = LiveContextTypes

export default LivePreview

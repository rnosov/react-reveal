/*
 * Hamburger Component For react-reveal
 *
 * Copyright © Roman Nosov 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { string, func } from 'prop-types';
import Responsive from './Responsive';
import Icon from './lib/HamburgerIcon';
import { animation, ie10 } from './lib/globals';

const
  propTypes = {
    icon: func,
    size: string,
    color: string,
    bgColor: string,
  },
  defaultProps = {
    icon: Icon,
    size: '28px',
    color: '#fff',
    bgColor: '#808080',
  };

class Hamburger extends React.Component {

  constructor(props) {
    super(props);
    this.icon = this.icon.bind(this);
    this.effect = this.effect.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  icon(props) {
    return this.props.icon( this.responsive.state.isClicked, this.props.size, this.props.color,
                            this.props.bgColor, animation, this.responsive.handleClick, props, );
  }

  above({ content, flex }) {
    return content({ style: flex('row') });
  }

  below({ content, defaultStyles, icon }) {
    const styles = defaultStyles();
    return (
      <div style={styles.container} /* className="your-class" */>
        {icon({ style: styles.icon /* className: 'your-class' */ })}
        {content({ style: styles.content /* className: 'your-class' */ })}
      </div>
    );
  }

  flex(mainAxis = 'row') {
    return {
      display: ie10 ? '-ms-flexbox' : 'flex',
      flexFlow: `${mainAxis} nowrap`,
      MsFlexFlow: `${mainAxis} nowrap`,
    }
  }

  getStyles() {
    return {
      container: {
        marginLeft: 'auto',
        paddingTop: '0.375rem' ,
        border: '1px solid transparent',
        marginTop: '-2.5rem' ,
        width: '100%  ',
        marginRight: 0,
        ...this.flex('column')
      },
      icon: {
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: this.props.bgColor,
        height: this.props.size,
        width: this.props.size,
        alignSelf: 'flex-end',
      },
      content: {
        marginTop: '0.375rem'
      },
    };
  }

  effect(state) {
    //console.log(this.state);
    return {
      force: true,
      disabled: state.match,
    };
  }

  render() {
    return (
      <Responsive
        above={this.above}
        below={this.below}
        {...this.props}
        icon={this.icon}
        effect={this.effect}
        defaultStyles={this.getStyles}
        flex={this.flex}
        ie10={ie10}
        ref={ el => this.responsive = el}
      />
    );
  }
}

Hamburger.propTypes = propTypes;
Hamburger.defaultProps = defaultProps;
export default Hamburger;

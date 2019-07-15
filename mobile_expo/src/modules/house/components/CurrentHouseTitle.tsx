import React from 'react';
import { connect } from 'react-redux';
import { ICurrentHouseState } from '../types/current';
import { Text, Thumbnail } from 'native-base';
import Logo from '../../../../assets/logo.png';

interface IProps {
  current: ICurrentHouseState;
}

class CurrentHouseTitle extends React.PureComponent<IProps> {
  render = () => {
    const { current } = this.props;

    if (!current.payload) {
      return null;
    }

    return (
      <>
        <Thumbnail source={Logo} />
        <Text style={{ fontFamily: 'Roboto', color: '#fff', fontSize: 19 }}>
          {current.payload.name}
        </Text>
      </>
    );
  };
}

export default connect(state => {
  return {
    current: state.house.current,
  };
})(CurrentHouseTitle);

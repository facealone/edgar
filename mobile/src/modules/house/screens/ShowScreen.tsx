import React from 'react';
import { connect } from 'react-redux';
import { Content, Text, Button, Icon, Spinner } from 'native-base';
import { bindActionCreators } from 'redux';
import { commonStyles } from '../../../theme/common';
import i18n from '../../../i18n';
import { ICurrentHouseState, ICurrentHouseResetAction } from '../types/current';
import { changeCurrentHouse } from '../middlewares/current';
import { reset } from '../actions/current';
import MemberList from '../components/member/MemberList';
import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from '../../../theme/colors';

interface IProps {
  navigation: any;
  changeCurrentHouse(house: string): any;
  current: ICurrentHouseState;
  reset(): ICurrentHouseResetAction;
}

class ShowScreen extends React.Component<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = () => {
    const { navigation, current } = this.props;

    if (current.success) {
      navigation.navigate('House');
    }
  };

  render = () => {
    const { navigation, current, changeCurrentHouse } = this.props;
    const { name, id } = navigation.state.params;

    return (
      <Content style={commonStyles.content}>
        {current.payload.id !== id && (
          <Button
            style={styles.joinButton}
            iconLeft
            small
            disabled={current.loading}
            onPress={() => changeCurrentHouse(id)}
          >
            {current.loading && <Spinner color={'#fff'} />}
            {!current.loading && <Icon name={'ios-log-in'} />}
            <Text>
              {i18n.t('house.show.loginOnHouse', {
                house: name,
              })}
            </Text>
          </Button>
        )}
        <MemberList house={id} />
      </Content>
    );
  };
}

ShowScreen.navigationOptions = ({ navigation }: any) => {
  const { name, id } = navigation.state.params;

  return {
    title: name,
  };
};

const styles = StyleSheet.create({
  joinButton: {
    backgroundColor: MAIN_COLOR,
    alignSelf: 'center',
    margin: 20,
  },
});

export default connect(
  state => {
    return {
      current: state.house.current,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ changeCurrentHouse, reset }, dispatch),
    };
  },
)(ShowScreen);

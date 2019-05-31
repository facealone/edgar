import React from 'react';
import i18n from '../../../i18n';
import { Content, Text } from 'native-base';
import HouseForm from '../components/HouseForm';
import { IHouseForm } from '../types/house';
import { commonStyles } from '../../../theme/common';

export class AddHouseScreen extends React.PureComponent {
  static navigationOptions = {
    title: i18n.t('house.add.title'),
  };

  handleSubmit = (payload: IHouseForm) => {
    return '';
  };

  render = () => {
    return (
      <Content>
        <Text style={commonStyles.intro}>
          {i18n.t('house.add.introduction')}
        </Text>
        <HouseForm loading={false} onSubmit={this.handleSubmit} />
      </Content>
    );
  };
}

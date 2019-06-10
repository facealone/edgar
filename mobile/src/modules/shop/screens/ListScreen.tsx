import React from 'react';
import {
  Content,
  Text,
  Separator,
  ListItem,
  Left,
  Icon,
  Body,
  Right,
} from 'native-base';
import { commonStyles } from '../../../theme/common';
import { MAIN_COLOR } from '../../../theme/colors';
import { StyleSheet } from 'react-native';

export default class ListScreen extends React.Component {
  render = () => {
    return (
      <Content>
        <Separator bordered>
          <Text style={commonStyles.headerFlatList}>Mes listes de courses</Text>
        </Separator>
        <ListItem icon>
          <Body>
            <Text>Franprix</Text>
            <Text style={style.helper}>8 articles</Text>
          </Body>
          <Right>
            <Icon name={'ios-arrow-dropright-circle'} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text>Carrefour</Text>
            <Text style={style.helper}>2 articles</Text>
          </Body>
          <Right>
            <Icon name={'ios-arrow-dropright-circle'} />
          </Right>
        </ListItem>
        <ListItem icon>
          <Body>
            <Text>Leclerc</Text>
            <Text style={style.helper}>Aucun article</Text>
          </Body>
          <Right>
            <Icon name={'ios-arrow-dropright-circle'} />
          </Right>
        </ListItem>
      </Content>
    );
  };
}

const style = StyleSheet.create({
  helper: {
    color: MAIN_COLOR,
    fontSize: 12,
  },
});

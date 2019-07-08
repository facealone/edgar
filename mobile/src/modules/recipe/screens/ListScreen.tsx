import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { bindActionCreators } from 'redux';
import {
  Content,
  Text,
  Body,
  Right,
  Icon,
  ListItem,
  Separator,
  Fab,
  Button,
} from 'native-base';
import i18n from '../../../i18n';
import { reset } from '../actions/list';
import { listRecipes } from '../middlewares/list';
import { commonStyles } from '../../../theme/common';
import { IRecipeListState, IRecipeListResetAction } from '../types/list';
import { Recipe } from '../models/Recipe';

interface IProps {
  reset(): IRecipeListResetAction;
  listRecipes(): any;
  navigation: any;
  recipes: IRecipeListState;
}

class ListScreen extends React.PureComponent<IProps> {
  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidMount = () => {
    this.props.listRecipes();
  };

  render = () => {
    const { recipes, navigation } = this.props;

    return (
      <>
        <Content style={commonStyles.content}>
          <Separator bordered>
            <Text style={commonStyles.centerHeaderFlatList}>
              {i18n.t('recipe.list.title')} ({recipes.payload.totalItems})
            </Text>
          </Separator>
          <Button iconLeft style={commonStyles.filterButton} small bordered>
            <Icon style={commonStyles.darkText} name={'ios-reorder'} />
            <Text style={commonStyles.darkText}>Filtres</Text>
          </Button>
          <FlatList
            keyExtractor={card => card.id}
            data={recipes.payload.items}
            refreshing={recipes.loading}
            onRefresh={() => {
              this.props.listRecipes();
            }}
            renderItem={({ item: recipe }: Recipe) => {
              const { uri, name, id, category, owner } = recipe;

              return (
                <ListItem
                  key={id}
                  onPress={() =>
                    navigation.navigate('RecipeShow', { name, uri, id })
                  }
                >
                  <Body>
                    <Text>{name}</Text>
                    <Text note>{category.name}</Text>
                    <Text note>
                      {owner.firstName} {owner.lastName}
                    </Text>
                  </Body>
                  <Right>
                    <Icon name={'ios-arrow-dropright-circle'} />
                  </Right>
                </ListItem>
              );
            }}
          />
        </Content>
        <Fab
          style={commonStyles.fabButton}
          position={'bottomRight'}
          onPress={() => {
            navigation.navigate('RecipeBrowser');
          }}
        >
          <Icon name={'add'} />
        </Fab>
      </>
    );
  };
}

export default connect(
  state => {
    return {
      recipes: state.recipe.list,
    };
  },
  dispatch => {
    return {
      ...bindActionCreators({ listRecipes, reset }, dispatch),
    };
  },
)(ListScreen);

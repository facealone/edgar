import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { client } from '../libraries/axios';

const persistConfig = {
  key: 'edgar-majordome',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(thunk.withExtraArgument(client)),
  );

  let persistor = persistStore(store);

  return { store, persistor };
};

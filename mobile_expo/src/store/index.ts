import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { client, axiosMiddleware } from '../libraries/axios';

const persistConfig = {
  key: 'edgar-majordome',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk.withExtraArgument(client), axiosMiddleware(client)),
  );

  const persistor = persistStore(store);

  return { store, persistor };
};

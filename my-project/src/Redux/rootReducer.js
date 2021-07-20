import { persistReducer } from 'redux-persist';
import appReducer from './appReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage
};
export default persistReducer(persistConfig, appReducer);

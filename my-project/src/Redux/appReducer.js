const reducer = (state = { users: [], loggedUser: {}, movies: [], subscriptions: [], members: [] }, action) => {
	switch (action.type) {
		case 'ADMIN_ENTERED': {
			return { ...state, loggedUser: action.payload };
		}
		case 'USER_ENTERED': {
			return { ...state, loggedUser: action.payload };
		}
		case 'INSERT_DATA': {
			return {
				...state,
				users: action.payload.users,
				movies: action.payload.movies,
				subscriptions: action.payload.subscriptions,
				members: action.payload.members
			};
		}
		case 'ADD_USER': {
			let newState = { ...state };
			newState.users.push(action.payload);
			return newState;
		}
		case 'UPDATE_USER': {
			let newState = { ...state };
			let index = newState.users.findIndex(user => user.id === action.payload.id);
			if (index >= 0) {
				newState.users[index] = action.payload;
			}
			return newState;
		}
		case 'DELETE_USER': {
			let newState = { ...state };
			let index = newState.users.findIndex(user => user.id === action.payload);
			if (index >= 0) {
				newState.users.splice(index, 1);
			}
			return newState;
		}
		case 'ADD_MOVIE': {
			let newState = { ...state };
			newState.movies.push(action.payload);
			return newState;
		}
		case 'UPDATE_MOVIE': {
			let newState = { ...state };
			let index = newState.movies.findIndex(movie => movie._id === action.payload._id);
			if (index >= 0) {
				newState.movies[index] = action.payload;
			}
			return newState;
		}
		case 'DELETE_MOVIE': {
			let newState = { ...state };
			let index = newState.movies.findIndex(movie => movie._id === action.payload);
			if (index >= 0) {
				newState.movies.splice(index, 1);
			}
			return newState;
		}
		case 'ADD_MEMBER': {
			let newState = { ...state };
			newState.members.push(action.payload);
			return newState;
		}
		case 'UPDATE_MEMBER': {
			let newState = { ...state };
			let index = newState.members.findIndex(member => member._id === action.payload._id);
			if (index >= 0) {
				newState.members[index] = action.payload;
			}
			return newState;
		}
		case 'DELETE_MEMBER': {
			let newState = { ...state };
			let index = newState.members.findIndex(member => member._id === action.payload);
			if (index >= 0) {
				newState.members.splice(index, 1);
			}
			return newState;
		}
		case 'ADD_SUB': {
			let newState = { ...state };
			newState.members.push(action.payload);
			return newState;
		}
		case 'UPDATE_SUB': {
			let newState = { ...state };
			let index = newState.members.findIndex(member => member._id === action.payload._id);
			if (index >= 0) {
				newState.members[index] = action.payload;
			}
			return newState;
		}
		case 'DELETE_SUB': {
			let newState = { ...state };
			let index = newState.members.findIndex(member => member._id === action.payload);
			if (index >= 0) {
				newState.members.splice(index, 1);
			}
			return newState;
		}
		default:
			return { ...state };
	}
};

export default reducer;

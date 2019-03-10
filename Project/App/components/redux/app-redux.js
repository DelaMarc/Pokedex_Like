import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

//
//	Initial State
//

const initialState = {
	profilePicture: null,
};

//
// Reducer
//

const reducer = (state = initialState, action) => {
	switch(action.type){
		case "setProfilePicture": 
			alert("action :", action.type);
			
			 return Object.assign({}, state, {
        image: action.profilePicture
      });
			//return { ...state, image: action.value};

		default: 
			return state;
	}
};

//
// Store
//

const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
export { store };

//
// Action creators
//

const setProfilePicture = (profilePicture) => {
	//alert("profile picture: " + profilePicture);
	return {
		type: "setProfilePicture",
		profilePicture
	};
}

export {setProfilePicture};
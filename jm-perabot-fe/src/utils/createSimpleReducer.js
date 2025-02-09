/**
 * This function returns a simpleReducer that handles two simple action types: {domain}/merge, {domain}/replace, and {domain}/destroy.
 * This style is not a conventional style from redux, but rather our own convention, so there
 * is no point in searching about this design pattern online since you will not find anything
 * similar.
 *
 * name: must be uppercase snake case and plural (e.g. postTags)
 *  */
const createSimpleReducer = (name, defaultState) => (
  state = defaultState || {},
  action
) => {
  switch (action.type) {
    case `${name}/merge`: {
      return Object.assign({}, state, action.payload);
    }
    case `${name}/replace`: {
      return Object.assign({}, action.payload);
    }
    case `${name}/destroy`:{
      return {}
    }
    default: {
      return state;
    }
  }
};

export default createSimpleReducer;

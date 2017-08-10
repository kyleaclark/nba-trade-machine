export default function reducerHandler(initialState, actionHandlers) {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type];

    if (reduceFn) {
      const nextState = reduceFn(state, action);
      return nextState;
    }

    return state;
  }
}

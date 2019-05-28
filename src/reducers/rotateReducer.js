const initialState = {
  previous: true,
  later: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "rotate":
      return {
        ...state,
        rotating: action.payload
      };
    default:
      return state;
  }
}
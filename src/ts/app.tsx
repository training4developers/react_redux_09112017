
const actions = [
  { type: 'ADD', value: 1 },
  { type: 'SUBTRACT', value: 2 },
  { type: 'ADD', value: 3 },
  { type: 'SUBTRACT', value: 4 },
  { type: 'ADD', value: 5 },
];

const finalState = actions.reduce((state = { result: 0 }, action) => {

  console.log('state: ', state, 'action:', action);

  switch (action.type) {
    case 'ADD':
      return Object.assign({}, state, {
        result: state.result + action.value,
      });
    case 'SUBTRACT':
      return {
        ...state,
        result: state.result - action.value,
      };
    default:
      return state;
  }

}, { result: 0 });

console.log('final state:', finalState);

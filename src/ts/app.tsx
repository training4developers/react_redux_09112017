
const addActionCreator = (value: number) => ({ type: 'ADD', value });
const subtractActionCreator = (value: number) => ({ type: 'SUBTRACT', value });

const actions = [
  addActionCreator(1),
  subtractActionCreator(2),
  addActionCreator(3),
  subtractActionCreator(4),
  addActionCreator(5),
];

interface Action {
  type: any;
}

interface CalcAction extends Action {
  value: number;
}

interface AppState {
  result: number;
}

const calcReducer = (state: AppState = { result: 0 }, action: CalcAction) => {
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
};

const createStore = <T extends {}>(reducer: (state: T, action: Action) => T) => {

  let currentState: T;
  const subscriptions: any[] = [];

  return {
    getState: () => currentState,
    dispatch: (action: Action) => {

      currentState = reducer(currentState, action);
      subscriptions.forEach((fn) => fn());

    },
    subscribe: (fn: () => void) => {
      subscriptions.push(fn);
    },
  };

};

const appStore = createStore<AppState>(calcReducer);

appStore.subscribe(() => {

  console.log('action was dispatched');
  console.log(appStore.getState());

});

appStore.dispatch(addActionCreator(1));

// const finalState = actions.reduce(calcReducer, { result: 0 });

// console.log('final state:', finalState);

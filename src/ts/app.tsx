
const addActionCreator = (value: number) => ({ type: 'ADD', value });
const subtractActionCreator = (value: number) => ({ type: 'SUBTRACT', value });

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

const bindActionCreators = (actionCreators: any, dispatch: (action: Action) => void) => {

  const actionFnNames = Object.keys(actionCreators);
  const actions: any = {};

  actionFnNames.forEach((actionFnName) => {
    actions[actionFnName] = (...params: any[]) => {
      dispatch(actionCreators[actionFnName](...params));
    };
  });

  return actions;
};

const { add, subtract } = bindActionCreators({
  add: addActionCreator,
  subtract: subtractActionCreator,
}, appStore.dispatch);

add(1);
subtract(2);
add(3);
subtract(4);
add(5);


// appStore.dispatch(addActionCreator(1));
// appStore.dispatch(subtractActionCreator(2));
// appStore.dispatch(addActionCreator(3));
// appStore.dispatch(subtractActionCreator(4));
// appStore.dispatch(addActionCreator(5));



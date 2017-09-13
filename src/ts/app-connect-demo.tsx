import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, bindActionCreators, Dispatch, Unsubscribe, Store } from 'redux';

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

const appStore = createStore<AppState>(calcReducer);

appStore.subscribe(() => {

  console.log('action was dispatched');
  console.log(appStore.getState());

});

interface CalcToolProps {
  onAdd: (n: number) => void;
  onSubtract: (n: number) => void;
  result: number;
}

const CalcTool: React.StatelessComponent<CalcToolProps> = (props: CalcToolProps) => {
  let numberInput: HTMLInputElement;
  return <form>
    <input type="number" ref={ (input) => numberInput = input } defaultValue="0" />
    <button type="button" onClick={() => props.onAdd(Number(numberInput.value))}>Add</button>
    <button type="button" onClick={() => props.onSubtract(Number(numberInput.value))}>Subtract</button>
    <div>
      Result: {props.result}
    </div>
  </form>;

};

const mapStateToProps = ({ result }: AppState) => ({ result });

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => bindActionCreators({
  onAdd: addActionCreator,
  onSubtract: subtractActionCreator,
}, dispatch);

const connect = <S extends {}>(
    mapStateToPropsFn: (state: S) => any,
    mapDispatchToPropsFn: (dispatch: Dispatch<S>) => any) => {

  return <PrP extends {}>(PresentationalComponent: React.StatelessComponent<PrP>) => {

    interface ContainerProps {
      store: Store<S>;
    }

    return class extends React.Component<ContainerProps, undefined> {

      public actionProps: any;
      public dataProps: any;
      public storeUnsubscribe: Unsubscribe;

      public constructor(props: ContainerProps) {
        super(props);
        this.actionProps = mapDispatchToPropsFn(props.store.dispatch);
      }

      public componentDidMount() {
        this.storeUnsubscribe = this.props.store.subscribe(() => {
          this.dataProps = mapStateToPropsFn(this.props.store.getState());
          this.forceUpdate();
        });
      }

      public componentWillUnmount() {
        this.storeUnsubscribe();
      }

      public render() {

        return <PresentationalComponent
          {...this.actionProps}
          {...this.dataProps}
        />;

      }

    };

  };

};

const CalcToolContainer = connect(mapStateToProps, mapDispatchToProps)(CalcTool);

ReactDOM.render(<CalcToolContainer store={appStore} />, document.querySelector('main'));

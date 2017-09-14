import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, bindActionCreators, Dispatch, Unsubscribe, Store, Action } from 'redux';
// import { connect, Provider } from 'react-redux';

const addActionCreator = (value: number) => ({ type: 'ADD', value });
const subtractActionCreator = (value: number) => ({ type: 'SUBTRACT', value });

interface CalcAction extends Action {
  value: number;
}

interface AppState {
  result: number;
  history: string[];
}

const initialState: AppState = {
  result: 0,
  history: [],
};

const calcReducer = (state: AppState = initialState, action: CalcAction) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        result: state.result + action.value,
      };
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
  onAdd: (n: number) => { type: string; value: number };
  onSubtract: (n: number) => { type: string; value: number };
  result: number;
}

class CalcTool extends React.Component<CalcToolProps, undefined> {

  public numberInput: HTMLInputElement;

  public render() {
    return <form>
      <input type="number" ref={ (input) => this.numberInput = input } defaultValue="0" />
      <button type="button" onClick={() => this.props.onAdd(Number(this.numberInput.value))}>
        Add</button>
      <button type="button" onClick={() => this.props.onSubtract(Number(this.numberInput.value))}>
        Subtract</button>
      <div>
        Result: {this.props.result}
      </div>
    </form>;
  }

}

// const CalcTool: React.StatelessComponent<CalcToolProps> = (props: CalcToolProps) => {
//   let numberInput: HTMLInputElement;
//   return <form>
//     <input type="number" ref={ (input) => numberInput = input } defaultValue="0" />
//     <button type="button" onClick={() => props.onAdd(Number(numberInput.value))}>Add</button>
//     <button type="button" onClick={() => props.onSubtract(Number(numberInput.value))}>Subtract</button>
//     <div>
//       Result: {props.result}
//     </div>
//   </form>;
// };

const mapStateToProps = ({ result }: AppState) => ({ result });

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => bindActionCreators({
  onAdd: addActionCreator,
  onSubtract: subtractActionCreator,
}, dispatch);

const connect = <S extends {}>(
    mapStateToPropsFn: (state: S) => any,
    mapDispatchToPropsFn: (dispatch: Dispatch<S>) => any) => {

  return (PresentationComponent: React.ComponentType) => {

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

        return <PresentationComponent
          {...this.actionProps}
          {...this.dataProps}
        />;

      }

    };

  };

};

const CalcToolContainer = connect(mapStateToProps, mapDispatchToProps)(CalcTool);

// ReactDOM.render(<Provider store={appStore}>
//   <CalcToolContainer />
// </Provider>, document.querySelector('main'));

// ReactDOM.render(<CalcToolContainer store={appStore} />, document.querySelector('main'));

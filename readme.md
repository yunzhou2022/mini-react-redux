# mini-react-redux

**仅供学习使用，切勿用于生产项目**

## 在线示例

[![Edit mini-react-redux-demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/devbox/mini-react-redux-demo-9m73rw?embed=1&file=%2Fsrc%2Fstore.ts)

## 手动示例

1. 安装

```shell
yarn add mini-react-redux;
```

2. 编写 store

```ts
import { createStore, Reducer } from "redux";

type State = {
  count: number;
};
type Action = {
  type: "add" | "subtract";
};
const reducer: Reducer<State, Action> = (
  state = {
    count: 0,
  },
  aciton
) => {
  switch (aciton.type) {
    case "add":
      return {
        count: state?.count + 1,
      };
    case "subtract":
      return {
        count: state?.count - 1,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
```

2. 使用 Provider 注入 store

```ts
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "mini-react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

3. 使用 connect

```tsx
import type { Dispatch } from "redux";
import { connect } from "mini-react-redux";

function _App(props: { count: number; dispatch: Dispatch }) {
  const { count, dispatch } = props;
  return (
    <div>
      <h1>react-redux</h1>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: "add" })}>add</button>
      <button onClick={() => dispatch({ type: "subtract" })}>subtract</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
```

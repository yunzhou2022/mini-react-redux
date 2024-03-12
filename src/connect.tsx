import { React } from "./react";
import { Dispatch, Store } from "redux";
import { Context } from "./Provider";

interface ImapStateToProps {
  (state: any): any;
}

interface ImapDispatchToProps {
  (dispatch: Dispatch): Record<string, Dispatch>;
}

export const connect = (
  mapStateToProps: ImapStateToProps = (state) => ({}),
  mapDispatchToProps: ImapDispatchToProps = (dispatch) => ({ dispatch })
) => {
  return (WillBeWrappedComponent: React.ComponentType) => {
    function getStateProps(store: Store) {
      return mapStateToProps(store.getState());
    }
    return (props: Record<string, unknown>) => {
      const store = React.useContext(Context);
      const [childProps, setChildProps] = React.useState<
        Record<string, unknown>
      >(getStateProps(store));

      React.useEffect(() => {
        return store.subscribe(() => {
          const selectedState = getStateProps(store);

          if (diff(childProps, selectedState)) {
            setChildProps(selectedState);
          }
        });
      }, []);

      return (
        <WillBeWrappedComponent
          {...childProps}
          {...mapDispatchToProps(store.dispatch)}
          {...props}
        />
      );
    };
  };
};

function diff(A: Object, B: Object) {
  return JSON.stringify(A) !== JSON.stringify(B);
}

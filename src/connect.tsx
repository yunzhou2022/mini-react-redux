import { React } from "./react";
import { Dispatch } from "redux";
import { Context } from "./Provider";

interface ImapStateToProps {
  (state: any): any;
}

interface ImapDispatchToProps {
  (dispatch: Dispatch): Record<string, Dispatch>;
}

export const connect = (
  mapStateToProps: ImapStateToProps,
  mapDispatchToProps: ImapDispatchToProps
) => {
  return (WillBeWrappedComponent: React.ComponentType) => {
    return (props: Record<string, unknown>) => {
      const store = React.useContext(Context);
      const [childProps, setChildProps] = React.useState<
        Record<string, unknown>
      >({});

      React.useEffect(() => {
        return store.subscribe(() => {
          const allState = store.getState();
          const selectedState = mapStateToProps(allState);

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

import { Component } from "react";
import { Link } from "@tanstack/react-router";
import { usePizzaOfTheDay } from "./usePizzaOfTheDay.jsx";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  // this needs to be "overridden"
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // in case you need to do stuff post construction
  constructor(props) {
    super(props);
  }

  // override this to log an error after being caught
  componentDidCatch(error, info) {
    // send to TrackJS/Sentry
    console.error("ErrorBoundary caught an error", error, info);
  }

  // need to do stuff like this because of how `this` is bound in JS
  // in normal functions context is bound where it is created
  // arrow functions are bound where invoked
  celebrateError = () => {
    // class-component specific function, instead of the `useState` hooks - a huge state
    // object which is used for any state we need
    this.setState({ celebration: "LOL" });
  };

  // *should* override to render when react renders you
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oh no!!</h2>
          <p>
            There was an error when loading this page.{" "}
            <Link to="/">Click here</Link>. to go back to the home page.
          </p>
        </div>
      );
    }

    // if no error, display my children, as the error boundaries sit one level above our normal components
    return this.props.children;
  }

  // old-fashioned state change functions
  componentDidMount() {}

  componentWillUnmount() {}

  componentDidUpdate(prevProps) {}
}

// What we would do, in order to use hooks from class components.
// Not expecting to see this day to day anytime soon
function EBWithHooks() {
  const potd = usePizzaOfTheDay();
  // props will be injected into the object, we can also accept them in `render`
  // or access them via `this.props`
  return <ErrorBoundary props={potd} />;
}

export default ErrorBoundary;

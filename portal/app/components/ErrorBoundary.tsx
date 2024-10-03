import React, { ReactNode } from "react";

/**
 * ErrorBoundary is a React component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
 */
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * A static method that returns an object to update the state when an error is caught.
   * @returns {object} An object to update the state when an error is caught.
   */
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      /**
       * A fallback UI to display when an error is caught.
       * @returns {JSX.Element} A fallback UI to display when an error is caught.
       */
      return (
        <div className="h-full w-full rounded-md bg-red-200 p-4 text-red-500" id="errorBoundary">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p>Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };

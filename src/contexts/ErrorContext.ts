import React, {Dispatch, SetStateAction} from "react";

type ErrorContextType = {
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>,
};

const ErrorContext = React.createContext<ErrorContextType>({
  error: null,
  setError: () => {},
});

export default ErrorContext;

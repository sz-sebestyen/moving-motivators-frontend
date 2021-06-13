import { useEffect, useRef } from "react";
import mouseTracker from "./mouseTracker";

const useMouseTracker = (shouldSubscribe, callback) => {
  const subIdRef = useRef(null);

  useEffect(() => {
    if (shouldSubscribe) {
      subIdRef.current = mouseTracker.subscibe(callback);
    }

    return () => {
      subIdRef.current && mouseTracker.unsubscribe(subIdRef.current);
      subIdRef.current = null;
    };
  }, [shouldSubscribe, callback]);
};

export default useMouseTracker;

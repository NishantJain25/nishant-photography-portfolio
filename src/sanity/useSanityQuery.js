import { useEffect, useState } from "react";
import { client } from "./client";

const useSanityQuery = (query, params = {}) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    if (!client) {
      setState({ data: null, loading: false, error: true });
      return;
    }

    let stale = false;
    setState({ data: null, loading: true, error: null });
    client
      .fetch(query, JSON.parse(paramsKey))
      .then((data) => {
        if (!stale) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!stale) setState({ data: null, loading: false, error });
      });

    return () => {
      stale = true;
    };
  }, [query, paramsKey]);

  return state;
};

export default useSanityQuery;

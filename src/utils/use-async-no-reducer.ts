import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });
  const mountedRef = useMountedRef();
  //NOTE: useState传入函数的意义是惰性初始化，所以要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        stat: "error",
        error,
      }),
    []
  );

  // run 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型的数据");
      }
      //NOTE: 注意这里要手动指定retry函数，否则无法实现retry的功能
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      //NOTE: 这里如果不使用state的函数用法，而直接用state，会造成无限循环
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    // NOTE: retry被调用时重新跑一遍run，让state刷新一遍
    retry,
    setData,
    setError,
    ...state,
  };
};

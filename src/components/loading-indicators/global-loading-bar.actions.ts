import { LaprThunkAction } from "./../../_interfaces/thunk";

export const BASE_INTERVAL = 100;
const RANDOM_POST_INTERVAL = 500;
const FINISH_DELAY = 500;
const PROGRESS_INCREMENT = 0.05;

export const START_LOADING = "START_LOADING";

export const startLoading = (): LaprThunkAction<void> => (
  (dispatch) => {
    dispatch(setProgress(10));
    dispatch(setShowLoading(true));
    dispatch(progressLoading());
  }
);

export const STOP_LOADING = "STOP_LOADING";

export const stopLoading = (): LaprThunkAction<void> => (
  (dispatch) => {
    dispatch(setStopping(true));
    setTimeout(() => {
      dispatch(setStopping(false));
      dispatch(setShowLoading(false));
    }, FINISH_DELAY);
  }
);

export const PROGRESS_LOADING = "PROGRESS_LOADING";

export const progressLoading = (): LaprThunkAction<void> => (
  (dispatch, getState) => {
    setTimeout(() => {
      dispatch(
        setProgress(
          getState().globalLoadingBar.progress + (90 - getState().globalLoadingBar.progress) * PROGRESS_INCREMENT
        )
      );
      if (getState().globalLoadingBar.show) {
        dispatch(progressLoading());
      } else {
        dispatch(setProgress(0));
      }
    }, BASE_INTERVAL + RANDOM_POST_INTERVAL * Math.random());
  }
);

export const SET_SHOW_LOADING = "SET_SHOW_LOADING";

export const setShowLoading = (isShow: boolean) => ({
  type: SET_SHOW_LOADING,
  show: isShow,
});

export const SET_PROGRESS = "SET_PROGRESS";

export const setProgress = (progress: number) => ({
  type: SET_PROGRESS,
  progress,
});

export const SET_STOPPING = "SET_STOPPING";

export const setStopping = (isStopping: boolean) => ({
  type: SET_STOPPING,
  stopping: isStopping,
});

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Calls the backend api.
 * @returns {Object}.
 * @param {function} actionCreator
 */
export default function useFromApi(
  actionCreator,
  dependencyList = [],
  conditional = () => true,
  isConcat = false,
  resetDependencies = []
) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [tempSortOrder, setTempSortOrder] = useState([]);
  const [sortOrder, setSortOrder] = useState([]);
  const [error, setError] = useState(undefined);
  const [totalPaginationCount, setTotalPaginationCount] = useState(0);
  const dispatch = useDispatch();

  const [refreshState, setRefreshState] = useState(true);

  function refresh() {
    setRefreshState(!refreshState);
  }

  useEffect(() => {
    setLoading(true);
    if (conditional()) {
      dispatch(actionCreator)
        .then((res) => {
          if (isConcat) {
            setTempSortOrder(res.data?.map((resource) => resource.id));
          } else {
            setSortOrder(res.data?.map((resource) => resource.id));
          }
          setSortOrder(res.data?.map((resource) => resource.id));
          setTotalPaginationCount(res?.totalPaginationCount);
        })
        .catch((err) => {
          setError(err);
          setSortOrder([]);
        })
        .finally(() => {
          setLoading(false);
          setDone(true);
        });
    } // eslint-disable-next-line
  }, [dispatch, conditional(), refreshState, ...dependencyList]);

  // resetDependencies list will reset the sortOrder
  useEffect(() => {
    setSortOrder([]);
  }, [dispatch, ...resetDependencies]);

  // Listen to changes to the temporary sortOrder,
  // then apply it accordingly
  useEffect(() => {
    // Concatinate to previous sortOrder
    setSortOrder(sortOrder.concat(tempSortOrder));
  }, [tempSortOrder]);

  /**
   * Loading tells whether call is still loading.
   * sortOrder tells the order of the resource's ids in data (not in included).
   * error is an object that contains the error from makeRequestThunkApi.
   * done tells whether or not the response has been returned.
   * refresh is a function that redo the API call
   */
  return { loading, sortOrder, error, done, refresh, totalPaginationCount };
}

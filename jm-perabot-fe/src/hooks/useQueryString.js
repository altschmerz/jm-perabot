import qs from "qs";
import { useHistory, useLocation } from "react-router-dom";

export default function useQueryString(qsSchema) {
  const history = useHistory();
  const location = useLocation();
  const search = location.search.replace("?", "");
  let query;

  try {
    query = qsSchema.cast(qs.parse(search));
  } catch (err) {
    window.location.replace("/404");
  }
  /**
   * Sets the Query String.
   * @param {object} args dictionary of params to args.
   */
  function setQueryStr(args) {
    history.push(makeQueryStrWith(args));
  }

  function makeQueryStrWith(args) {
    const queryClauses = Object.entries(args).map(([param, arg]) => {
      if (Array.isArray(arg)) {
        let returnString = "";
        for (var i = 0; i < arg.length; i++) {
          returnString =
            returnString + `${param}[]=${encodeURIComponent(arg[i])}`;

          if (i < arg.length - 1) {
            returnString = returnString + "&";
          }
        }

        return returnString;
      } else {
        return `${param}=${encodeURIComponent(arg)}`;
      }
    });

    return `${location.pathname}?${queryClauses.join("&")}`;
  }

  return [query, setQueryStr, makeQueryStrWith];
}

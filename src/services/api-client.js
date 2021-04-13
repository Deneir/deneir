import { getConfig } from './read-config';

/**
 * Base API call method
 *
 * @param  {String} method    POST | GET | PUT | DELETE
 * @param  {String} endpoint       endpoint to call
 * @param  {Object} body      payload of the request (default {})
 * @return {Promise} promise  promise with the API call
 */
export default function callApi(method, endpoint, body) {
  const apiBaseUrl = getConfig('apiBaseUrl');
  const authToken = getConfig('authToken');

  return fetch(`${apiBaseUrl}/${endpoint}`, {
    method,
    body,
    withCredentials: true,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    const result = response.json();

    if (result.body && result.body.acknowledged === false) {
      return new Error(result.body.data.error);
    }

    return result;
  });
}

export default {
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  baseURL: '/',
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 100000,
  retry: 0,
  retryDelay: 1000,
  withCredentials: true,
  // `headers` are custom headers to be sent
  headers: {
    'Content-Type': 'application/json'
  }
}


import axios from 'axios';

let lastCalled = 0;
const MIN_INTERVAL = 1100; // 1100ms = just over 1 request per second

export async function throttledGet(url, params) {
  const now = Date.now();
  const timeSinceLastCall = now - lastCalled;

  if (timeSinceLastCall < MIN_INTERVAL) {
    const waitTime = MIN_INTERVAL - timeSinceLastCall;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  lastCalled = Date.now(); // update timestamp after waiting
  return axios.get(url, { params });
}

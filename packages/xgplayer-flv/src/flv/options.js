/**
 * @typedef {{
 *  media: HTMLMediaElement,
 *  url?: string,
 *  isLive?: boolean,
 *  softDecode?: boolean,
 *  analyzeDuration?: number,
 *  maxJumpDistance?: number,
 *  maxLatency?: number,
 *  targetLatency?: number,
 *  bufferBehind?: number,
 *  retryCount?: number,
 *  retryDelay?: number,
 *  disconnectRetryCount?: number
 *  loadTimeout?: number,
 *  maxReaderInterval?: number,
 *  preloadTime?: number,
 *  defaultVodLoadSize?: number,
 *  disconnectTime?: number,
 *  fetchOptions?: RequestInit,
 *  seamlesslyReload: boolean,
*   keepStatusAfterSwitch?: boolean,
*   onlyVideo?: boolean,
*   onlyAudio?: boolean,
*   preProcessUrl?: (url: string, ext?: { [propName: string]: any }) => { url: string, [propName: string]: any }
 * }} FlvOption
 */

/**
 * @param {FlvOption} opts
 * @returns {FlvOption}
 */
export function getOption (opts) {
  const ret = {
    retryCount: 3,
    retryDelay: 1000,
    disconnectRetryCount: 0,
    loadTimeout: 10000,
    maxReaderInterval: 5000,
    preloadTime: 5,
    defaultVodLoadSize: 10000000,
    isLive: false,
    softDecode: false,
    bufferBehind: 10,
    maxJumpDistance: 3,
    analyzeDuration: 20000,
    seamlesslyReload: false,
    keepStatusAfterSwitch: true,
    onlyVideo: false,
    onlyAudio: false,
    ...opts
  }

  if (ret.isLive) {
    if (ret.preloadTime) {
      // compat old

      if (!ret.maxLatency) {
        ret.maxLatency = ret.preloadTime * 2
      }
      if (!ret.targetLatency) {
        ret.targetLatency = ret.preloadTime
      }

      if (ret.disconnectTime === null || ret.disconnectTime === undefined) {
        ret.disconnectTime = ret.maxLatency
      }
    }
  }

  return ret
}

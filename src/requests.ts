import axios from "axios"
import { parseChatData, getOptionsFromLivePage } from "./parser"
import { FetchOptions } from "./types/yt-response"
import { ChatItem, YoutubeId } from "./types/data"

export const client = axios.create({
  baseURL: 'https://www.youtube.com/',
  headers: {
    "Accept-Encoding": "utf-8",
  },
})

export async function fetchChat(options: FetchOptions): Promise<[ChatItem[], string]> {
  const url = `youtubei/v1/live_chat/get_live_chat?key=${options.apiKey}`
  const res = await client.post(url, {
    context: {
      client: {
        clientVersion: options.clientVersion,
        clientName: "WEB",
      },
    },
    continuation: options.continuation,
  })

  return parseChatData(res.data)
}

export async function fetchLivePage(id: { channelId: string } | { liveId: string } | { handle: string }) {
  const url = generateLiveUrl(id)
  if (!url) {
    throw TypeError("not found id")
  }
  const res = await client.get(url)
  return getOptionsFromLivePage(res.data.toString())
}

function generateLiveUrl(id: YoutubeId) {
  if ("channelId" in id) {
    return `channel/${id.channelId}/live`
  } else if ("liveId" in id) {
    return `watch?v=${id.liveId}`
  } else if ("handle" in id) {
    let handle = id.handle
    if (!handle.startsWith("@")) {
      handle = "@" + handle
    }
    return `${handle}/live`
  }
  return ""
}

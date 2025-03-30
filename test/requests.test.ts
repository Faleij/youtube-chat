
import axios from "axios"

jest.mock("axios")
axios.create = jest.fn(() => axios)
jest.mock("../src/parser")

import { fetchLivePage, fetchChat, client } from "../src/requests"
import { parseChatData, getOptionsFromLivePage } from "../src/parser"

const mockParseChatData = parseChatData as jest.Mock
const mockGetOptionsFromLivePage = getOptionsFromLivePage as jest.Mock

describe("requests", () => {
  describe("fetchChat", () => {
    test("Request", async () => {
      const mockPost = client.post as jest.Mock
      mockPost.mockResolvedValue({ data: "responseData" })
      const options = {
        apiKey: "apiKey",
        clientVersion: "clientVersion",
        continuation: "continuation",
      }
      await fetchChat(options)
      expect(mockPost).toHaveBeenCalledWith(
        `youtubei/v1/live_chat/get_live_chat?key=${options.apiKey}`,
        {
          context: {
            client: {
              clientVersion: options.clientVersion,
              clientName: "WEB",
            },
          },
          continuation: options.continuation,
        }
      )
      expect(mockParseChatData).toHaveBeenCalledWith("responseData")
    })
  })

  describe("fetchLivePage", () => {
    test("ChannelID request", async () => {
      const mockGet = client.get as jest.Mock
      mockGet.mockResolvedValue({ data: "responseData" })
      await fetchLivePage({ channelId: "channelId" })
      expect(mockGet).toHaveBeenCalledWith("channel/channelId/live")
      expect(mockGetOptionsFromLivePage).toHaveBeenCalledWith("responseData")
    })

    test("LiveID request", async () => {
      const mockGet = client.get as jest.Mock
      mockGet.mockResolvedValue({ data: "responseData" })
      await fetchLivePage({ liveId: "liveId" })
      expect(mockGet).toHaveBeenCalledWith("watch?v=liveId")
      expect(mockGetOptionsFromLivePage).toHaveBeenCalledWith("responseData")
    })

    test("Handle request", async () => {
      const mockGet = client.get as jest.Mock
      mockGet.mockResolvedValue({ data: "responseData" })
      await fetchLivePage({ handle: "@handle" })
      expect(mockGet).toHaveBeenCalledWith("@handle/live")
      expect(mockGetOptionsFromLivePage).toHaveBeenCalledWith("responseData")
    })

    test("Handle without '@' request", async () => {
      const mockGet = client.get as jest.Mock
      mockGet.mockResolvedValue({ data: "responseData" })
      await fetchLivePage({ handle: "handle" })
      expect(mockGet).toHaveBeenCalledWith("@handle/live")
      expect(mockGetOptionsFromLivePage).toHaveBeenCalledWith("responseData")
    })
  })
})

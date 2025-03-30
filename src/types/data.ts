/** 整形後の型 */

/** 取得したチャット詳細 */
export interface ChatItem {
  id: string
  author: {
    name: string
    thumbnail?: ImageItem
    channelId: string
    badge?: {
      thumbnail: ImageItem
      label: string
    }
  }
  message: MessageItem[]
  superchat?: {
    amount: string
    color: string
    sticker?: ImageItem
  }
  isMembership: boolean
  isVerified: boolean
  isOwner: boolean
  isModerator: boolean
  timestamp: Date
}

/** チャットメッセージの文字列or絵文字 */
export type MessageItem = { text: string } | UrlItem | EmojiItem

/** 画像 */
export interface ImageItem {
  url: string
  alt: string
}

/** Emoji */
export interface EmojiItem extends ImageItem {
  emojiText: string
  isCustomEmoji: boolean
}

export interface UrlItem {
  /** Link as optionally shortened text, do not use to get the url */
  text: string;
  navigationEndpoint: {
    clickTrackingParams?: string;
    commandMetadata: {
      webCommandMetadata: {
        url: string,
        webPageType: string | 'WEB_PAGE_TYPE_UNKNOWN',
        rootVe: number;
      }
    },
    urlEndpoint: {
      /** actual url is in the q search param of this url (e.g. url = https://www.youtube.com/redirect?event=live_chat&redir_token=...&q=https%3A%2F%2Fgithub.com) */
      url: string;
      target: string | 'TARGET_NEW_WINDOW';
      nofollow: boolean;
    };
  };
}

export type YoutubeId = { channelId: string } | { liveId: string } | { handle: string }

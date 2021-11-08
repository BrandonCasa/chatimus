import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface MediaItem {
  isInline: boolean;
  textPosition: number;
  image: boolean;
  video: boolean;
  isUrl: boolean;
  format: string;
  content: string;
}

export interface CodeBlockItem {
  isInline: boolean;
  textPosition: number;
  language: string;
}

export interface TextItem {
  textPosition: number;
  text: string;
  isHyperlink: boolean;
  hyperlinkUrl: string;
  hyperlinkText: string;
  hyperlinkColorCode: string;
}

export interface MessageContent {
  media: MediaItem[];
  text: TextItem[];
  codeBlocks: CodeBlockItem[];
}

export interface SenderInfo {
  senderUserID: string;
  senderChatID: string;
  senderChatChannelID: string;
  senderTime: string;
}

export interface Notification {
  senderInfo: SenderInfo;
  messageContent: MessageContent;
  owner: number;
}

export interface NotificationsData {
  notifications: Notification[];
}

// Define a type for the slice state
interface NotificationsState {
  data: NotificationsData;
}

// Define the initial state using that type
const initialState: NotificationsState = {
  data: {
    notifications: [],
  },
};

export const notificationsSlice = createSlice({
  name: "notifications",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.data.notifications.push(action.payload);
      return;
    },
  },
});

export const { addNotification } = notificationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNotifications = (state: RootState) => state.notifications.data;

export default notificationsSlice.reducer;

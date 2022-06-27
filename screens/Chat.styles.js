import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";

export const ChatBackground = styled.ImageBackground`
  flex: 1;
`;

export const ChatBox = styled(GiftedChat).attrs({
  timeTextStyle: { right: { color: "#717171" } },
})``;

export const CamerIconBox = styled(Actions).attrs({
  containerStyle: { position: "absolute", right: 55, bottom: 5, zIndex: 9999 },
})``;

export const CamerIcon = styled(Ionicons).attrs({
  color: "#717171",
  size: 30,
  name: "camera",
})``;

export const SendButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  height: 40px;
  width: 40px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const SendIcon = styled(Ionicons).attrs({
  color: "white",
  size: 20,
  name: "send",
})``;

export const MessgaeInput = styled(InputToolbar).attrs({
  containerStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
    paddingTop: 5,
    borderRadius: 20,
  },
})``;

export const BubbleBox = styled(Bubble).attrs({
  textStyle: { right: { color: "#3C3C3C" } },
  wrapperStyle: {
    left: {
      backgroundColor: "white",
    },
    right: {
      backgroundColor: "#dcf8c6",
    },
  },
})``;

export const ImageBorder = styled.View`
  border-radius: 15px;
  padding: 2px;
`;

export const Image = styled.Image.attrs({
  resizeMode: "cover",
})`
  width: 200px;
  height: 200px;
  padding: 6px;
  border-radius: 15px;
`;

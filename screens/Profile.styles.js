import styled from "styled-components/native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[3]};
  padding-top: ${Constants.statusBarHeight + 20}px;
`;

export const Header = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.foreground};
`;

export const EnterDataInfo = styled.Text`
  margin-top: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text};
`;

export const CameraIconButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.space[4]};
  width: 120px;
  height: 120px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 120px;
`;

export const CameraIcon = styled(MaterialCommunityIcons).attrs({
  name: "camera-plus",
  color: "#717171",
  size: 45,
})``;

export const SelectedImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 120px;
`;

export const NameInput = styled.TextInput`
  margin-top: ${(props) => props.theme.space[4]};
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => props.theme.colors.primary};
`;

export const ButtonBox = styled.View`
  margin-top: auto;
  width: 80px;
`;

export const NextButton = styled.Button.attrs({
  color: "#25d366",
})``;

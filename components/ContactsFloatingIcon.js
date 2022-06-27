import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const FloatingIcon = styled.TouchableOpacity`
  position: absolute;
  align-items: center;
  justify-content: center;
  right: ${(props) => props.theme.space[3]};
  bottom: ${(props) => props.theme.space[3]};
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 60px;
`;

const Icon = styled(MaterialCommunityIcons).attrs({
  name: "android-messages",
  size: 30,
  color: "white",
})`
  transform: scaleX(-1);
`;

export default function ContactsFloatingIcon() {
  const navigation = useNavigation();

  return (
    <FloatingIcon onPress={() => navigation.navigate("contacts")}>
      <Icon />
    </FloatingIcon>
  );
}

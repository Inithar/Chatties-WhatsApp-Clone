import { useRoute } from "@react-navigation/native";
import React from "react";
import Avatar from "./Avatar";
import styled from "styled-components/native";

const ChatHeaderContainer = styled.View`
  flex-direction: row;
`;

const UserNameContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => props.theme.space[2]};
`;

const UserName = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.white};
`;

export default function ChatHeader() {
  const route = useRoute();

  return (
    <ChatHeaderContainer>
      <Avatar size={35} user={route.params.user} />
      <UserNameContainer>
        <UserName>
          {route.params.user.contactName || route.params.user.displayName}
        </UserName>
      </UserNameContainer>
    </ChatHeaderContainer>
  );
}

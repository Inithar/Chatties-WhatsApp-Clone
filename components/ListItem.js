import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Grid, Col } from "react-native-easy-grid";
import Avatar from "./Avatar";
import {
  Container,
  AvatarBox,
  ChatInfo,
  FirstRow,
  UserName,
  TimeBox,
  Time,
  SecondRow,
  LastMessage,
} from "./ListItem.styles";

export default function ListItem({
  type,
  description,
  user,
  time,
  room,
  image,
}) {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() => navigation.navigate("chat", { user, room, image })}
    >
      <Grid>
        <AvatarBox>
          <Avatar user={user} size={type === "contacts" ? 50 : 65} />
        </AvatarBox>

        <ChatInfo>
          <FirstRow>
            <Col>
              <UserName>{user.contactName || user.displayName}</UserName>
            </Col>

            {time && (
              <TimeBox>
                <Time>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Time>
              </TimeBox>
            )}
          </FirstRow>

          {description && (
            <SecondRow>
              <LastMessage>{description}</LastMessage>
            </SecondRow>
          )}
        </ChatInfo>
      </Grid>
    </Container>
  );
}

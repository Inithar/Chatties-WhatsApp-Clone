import styled from "styled-components/native";
import { Row, Col } from "react-native-easy-grid";

export const Container = styled.TouchableOpacity`
  height: 80px;
`;

export const AvatarBox = styled(Col)`
  justify-content: center;
  align-items: center;
  width: 80px;
`;

export const ChatInfo = styled(Col)`
  margin-left: ${(props) => props.theme.space[2]};
`;

export const FirstRow = styled(Row)`
  align-items: center;
`;

export const UserName = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.text}; ;
`;

export const TimeBox = styled(Col)`
  align-items: flex-end;
`;

export const Time = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.secondaryText}; ;
`;

export const SecondRow = styled(Row)`
  margin-top: -${(props) => props.theme.space[1]};
`;

export const LastMessage = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.secondaryText}; ;
`;

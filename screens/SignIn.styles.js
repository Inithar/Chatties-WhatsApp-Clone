import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
`;

export const WelcomeMessage = styled.Text`
  color: ${(props) => props.theme.colors.foreground};
  font-size: ${(props) => props.theme.fontSizes.h5};
  margin-bottom: ${(props) => props.theme.space[4]};
`;

export const Image = styled.Image`
  width: 180px;
  height: 180px;
`;

export const FormBox = styled.View`
  margin-top: ${(props) => props.theme.space[4]};
`;

export const EmailInput = styled.TextInput`
  width: 210px;
  border-bottom-color: ${(props) => props.theme.colors.primary};
  border-bottom-width: 2px;
`;

export const PasswordInput = styled.TextInput`
  margin-top: ${(props) => props.theme.space[3]};
  width: 210px;
  border-bottom-color: ${(props) => props.theme.colors.primary};
  border-bottom-width: 2px;
`;

export const Spacer = styled.View`
  margin-top: ${(props) => props.theme.space[3]};
`;

export const Description = styled.TouchableOpacity`
  margin-top: ${(props) => props.theme.space[3]};
`;

export const TextDescription = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.secondaryText};
`;

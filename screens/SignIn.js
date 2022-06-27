import React, { useState } from "react";
import { Button } from "react-native";
import { signIn, signUp } from "../firebase";
import { t } from "../lang";
import {
  Container,
  WelcomeMessage,
  Image,
  FormBox,
  EmailInput,
  PasswordInput,
  Spacer,
  Description,
  TextDescription,
} from "./SignIn.styles";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");

  // Sign Up or Sign In a user
  async function handlePress() {
    if (mode === "signUp") {
      await signUp(email, password);
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }

  return (
    <Container>
      <WelcomeMessage>{t("Welcome to Chatties")}</WelcomeMessage>
      <Image source={require("../assets/welcome-img.png")} resizeMode="cover" />

      <FormBox>
        <EmailInput placeholder="Email" value={email} onChangeText={setEmail} />
        <PasswordInput
          placeholder={t("Password")}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Spacer />
        <Button
          title={mode === "signUp" ? t("Sign Up") : t("Sign in")}
          disabled={!password || !email}
          color="#25d366"
          onPress={handlePress}
        />

        <Description
          onPress={() =>
            mode === "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <TextDescription>
            {mode === "signUp"
              ? t("Already have an account? Sign In")
              : t("Don't have an account? Sign Up")}
          </TextDescription>
        </Description>
      </FormBox>
    </Container>
  );
}

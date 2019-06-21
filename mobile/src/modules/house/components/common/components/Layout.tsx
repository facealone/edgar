import React, { useState, useEffect } from "react";
import { Root } from "native-base";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Container } from "native-base";
import Navigation from "../../../navigation";

export const Layout = () => {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    const initFonts = async () => {
      await Font.loadAsync({
        Roboto: require("../../../../node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("../../../../node_modules/native-base/Fonts/Roboto_medium.ttf")
      });
      setReady(true);
    };

    initFonts();
  }, []);

  if (false === ready) {
    return <AppLoading />;
  }

  return (
    <Root>
      <Container>
        <Navigation />
      </Container>
    </Root>
  );
};

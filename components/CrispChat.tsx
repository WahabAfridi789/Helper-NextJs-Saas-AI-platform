"use client";

import { useEffect } from "react";

import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("ef0d428c-8731-4073-81eb-c485fe464714");
  }, []);

  return null;
};

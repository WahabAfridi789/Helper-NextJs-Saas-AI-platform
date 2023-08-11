"use client";

import { useState, useEffect } from "react";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <ProModel />
    </>
  );
};

"use client";

import { useState, useEffect } from "react";
import { ProModel } from "@/components/ProModel";

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

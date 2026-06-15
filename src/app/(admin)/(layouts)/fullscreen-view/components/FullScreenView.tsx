"use client";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FullScreenView = () => {
  const navigation = useRouter();
  const { changeMainMenuSize } = useLayoutContext();
  useEffect(() => {
    changeMainMenuSize("fullscreen");
    navigation.push("/dashboard");
  }, [navigation]);
  return <></>;
};

export default FullScreenView;

"use client";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HoverMenu = () => {
  const navigation = useRouter();
  const { changeMainMenuSize } = useLayoutContext();
  useEffect(() => {
    changeMainMenuSize("sm-hover");
    navigation.push("/dashboard");
  }, [navigation]);
  return <></>;
};

export default HoverMenu;

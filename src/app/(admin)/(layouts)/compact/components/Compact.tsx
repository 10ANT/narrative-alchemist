"use client";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Compact = () => {
  const navigation = useRouter();
  const { changeMainMenuSize } = useLayoutContext();
  useEffect(() => {
    changeMainMenuSize("compact");
    navigation.push("/dashboard");
  }, [navigation, changeMainMenuSize]);
  return <></>;
};

export default Compact;

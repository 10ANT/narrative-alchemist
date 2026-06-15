"use client";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FullView = () => {
  const navigation = useRouter();
  const { changeMainMenuSize } = useLayoutContext();
  useEffect(() => {
    changeMainMenuSize("full");
    navigation.push("/dashboard");
  }, [navigation]);
  return <></>;
};

export default FullView;

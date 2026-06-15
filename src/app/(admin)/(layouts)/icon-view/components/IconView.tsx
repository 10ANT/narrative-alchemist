"use client";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const IconView = () => {
  const navigation = useRouter();
  const { changeMainMenuSize } = useLayoutContext();
  useEffect(() => {
    changeMainMenuSize("condensed");
    navigation.push("/dashboard");
  }, [navigation]);
  return <></>;
};

export default IconView;

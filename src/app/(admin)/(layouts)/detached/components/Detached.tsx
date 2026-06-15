"use client";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Detached = () => {
  const navigation = useRouter();
  const { changeLayoutMode } = useLayoutContext();
  useEffect(() => {
    changeLayoutMode("detached");
    navigation.push("/dashboard");
  }, [navigation]);
  return <></>;
};

export default Detached;

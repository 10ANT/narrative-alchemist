"use client";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Horizontal = () => {
  const navigation = useRouter();
  const { changeLayoutOrientation } = useLayoutContext();

  useEffect(() => {
    changeLayoutOrientation("horizontal");
    navigation.push("/dashboard");
  }, [navigation]);

  return null;
};

export default Horizontal;

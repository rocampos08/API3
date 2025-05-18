
"use client";

import { useLottie } from "lottie-react";
import animationData from "@/app/components/web2.json";

const LottieAnimation = () => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return <div className="w-100 h-100 block mx-auto">{View}</div>;
};

export default LottieAnimation;

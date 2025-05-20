"use client";
import React, { use } from "react";
import { GlobalContestProvider } from "@/app/contest/globalContest";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return <GlobalContestProvider>{children}</GlobalContestProvider>;
}

export default ContextProvider;

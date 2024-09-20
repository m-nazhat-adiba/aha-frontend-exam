"use client";

import React, { PropsWithChildren } from "react";
import { store } from "@/store/store";
import { Provider } from "react-redux";

const ReduxProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

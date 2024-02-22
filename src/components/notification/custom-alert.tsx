"use client";
import { forwardRef } from "react";

import { Alert as MUIAlert } from "@mui/material";

import { CustomContentProps, SnackbarContent } from "notistack";

export const Alert = forwardRef<HTMLDivElement, CustomContentProps>((props, ref) => {
  const { id, message, variant, ...other } = props;

  const severity = (() => {
    if (variant === "error") return "error";
    return "success";
  })();

  return (
    <SnackbarContent
      id={id?.toString() ?? ""}
      ref={ref}
      role="alert"
      {...other}
      style={{ justifyContent: "flex-end" }}
    >
      <MUIAlert severity={severity} sx={{ minWidth: 288 }}>
        {message}
      </MUIAlert>
    </SnackbarContent>
  );
});

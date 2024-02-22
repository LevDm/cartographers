import React, { useEffect, useRef } from "react";

import { Frame } from "./board-frame";
import { Popover } from "@mui/material";

import { GameBoardPropsType } from "./types";
import { InputBoard } from "./input-board";
import { observer } from "mobx-react-lite";
import { useStore } from "@/mobx-store/use-store-provider";

export const Board = observer((props: GameBoardPropsType) => {
  const { openInputStep, inputHandler, inputClose } = props;

  const { mapFrames } = useStore();

  const isOpen = Boolean(openInputStep);

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && boardRef) {
      boardRef.current?.scrollIntoView({ block: "center" });
    }
  }, [isOpen]);

  const handleClose = () => {
    inputClose();
  };

  return (
    <>
      <div
        ref={boardRef}
        style={{
          maxWidth: "600px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(11, 1fr)",
          gridTemplateRows: "repeat(11, 1fr)",
          gap: 2,
        }}
        aria-describedby={"simple-popover"}
      >
        {mapFrames.map((el) => (
          <Frame key={el.id} {...el} usageIn="show" />
        ))}
      </div>

      <Popover
        open={isOpen}
        anchorEl={boardRef?.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        slotProps={{
          root: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          },
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              backgroundColor: "transparent",
            },
          },
        }}
        transitionDuration={{ exit: 0 }}
      >
        <InputBoard width={boardRef?.current?.clientWidth ?? "90vw"} inputHandler={inputHandler} />
      </Popover>
    </>
  );
});

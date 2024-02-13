import React, { useState, useEffect, useRef } from "react";

import { Frame } from "./board-frame";
import { Popover } from "@mui/material";
import { InputField } from "./board-input";

type FieldTypes = "none" | "hill" | "home" | "tree" | "evil" | "brim" | "pond" | "void";

const frames = [...Array(121)].map((_, index) => {
  const row = Math.floor(index / 11);
  const col = index - 11 * row;
  return { id: `${row}-${col}`, isEdit: false, type: "none" as FieldTypes };
});

//props: { open: boolean; handleClose: () => unknown }
export const Board = () => {
  //const { open } = props

  const [open, setOpen] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && boardRef) {
      boardRef.current?.scrollIntoView({ block: "center" });
    }
  }, [open]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState(frames);

  const frameClickHandler = (id: string) => {
    setData((prev) => {
      const indexItem = prev.findIndex((e) => e.id == id);
      const res = [...prev];
      res[indexItem] = { ...res[indexItem], isEdit: !res[indexItem].isEdit };

      return res;
    });
  };

  const handleChoiseReset = () => {
    setData((prev) => {
      const res = [...prev].map((e) => ({ ...e, isEdit: false }));
      return res;
    });
  };

  const handleChoiseApply = () => {
    handleClose();
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
          //padding: 2,
          cursor: "pointer",
          //marginBottom: 2,
        }}
        aria-describedby={"simple-popover"}
        onClick={handleClick}
      >
        {data.map((el) => (
          <Frame key={el.id} {...el} usageIn="show" />
        ))}
      </div>

      <Popover
        open={open}
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
        <div
          style={{
            width: boardRef ? boardRef.current?.clientWidth : "100vw",
            display: "grid",
            gridTemplateColumns: "repeat(11, 1fr)",
            gridTemplateRows: "repeat(11, 1fr)",
            gap: 2,
          }}
        >
          {data.map((el) => (
            <Frame key={el.id} {...el} usageIn="edit" handler={frameClickHandler} />
          ))}
        </div>

        <InputField handleChoiseReset={handleChoiseReset} handleChoiseApply={handleChoiseApply} />
      </Popover>
    </>
  );
};

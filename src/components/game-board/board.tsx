import React, { useState, useEffect, useRef, useMemo } from "react";

import { Frame } from "./board-frame";
import { Popover } from "@mui/material";
import { InputField } from "./board-input";

import { AllActionTypes, AllFrameTypes, MapFramesType } from "@/data/types";

export type GameBoardPropsType = {
  openInputStep: boolean;
  mapFrames: MapFramesType[];
  inputHandler: (newMapFrames: MapFramesType[], getCoins?: number) => unknown;
  inputClose: () => unknown;
};

export const Board = (props: GameBoardPropsType) => {
  const { openInputStep, mapFrames, inputHandler, inputClose } = props;

  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openInputStep && boardRef) {
      boardRef.current?.scrollIntoView({ block: "center" });
    }
  }, [openInputStep]);

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
        open={openInputStep}
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
        <InputBoard
          mapFrames={mapFrames}
          width={boardRef?.current?.clientWidth ?? "90vw"}
          inputHandler={inputHandler}
        />
      </Popover>
    </>
  );
};

type InputBoardPropsType = {
  mapFrames: MapFramesType[];
  width: number | string;
  inputHandler: (newMapFrames: MapFramesType[], getCoins?: number) => unknown;
};

function InputBoard(props: InputBoardPropsType) {
  const { mapFrames, inputHandler, width } = props;

  const [data, setData] = useState<(MapFramesType & { isEdit?: boolean })[]>(
    mapFrames.map((el) => ({ ...el, isEdit: false }))
  );

  const handleChoiseReset = () => {
    setData(mapFrames.map((el) => ({ ...el, isEdit: false })));
  };

  const frameClickHandler = (id: string) => {
    setData((prev) => {
      const indexItem = prev.findIndex((e) => e.id == id);
      const res = [...prev];
      if (location.type && !res[indexItem].isEdit) {
        res[indexItem] = {
          ...res[indexItem],
          isEdit: true,
          frameType: location.type,
        };
      } else {
        res[indexItem] = { ...mapFrames[indexItem], isEdit: !res[indexItem].isEdit };
      }

      return res;
    });
  };

  const handleChoiseApply = () => {
    const newMap = [...data].map((el) => {
      delete el.isEdit;
      return el;
    });

    //location coin???

    inputHandler(newMap);
  };

  const [location, setLocation] = useState<{
    type: AllFrameTypes | undefined;
    subType: string | undefined;
    ruin: boolean;
  }>({ type: undefined, subType: undefined, ruin: false });

  const handleLocation = (value: AllFrameTypes) => {
    setLocation((prev) => ({
      ...prev,
      type: value,
    }));

    if (value) {
      setData((prev) => {
        return [...prev].map((el) => {
          if (el.isEdit) return { ...el, frameType: value };
          return el;
        });
      });
    }
  };

  const applyDissabled = useMemo(
    () => data.findIndex((el) => el.isEdit === true) === -1 || !Boolean(location.type),
    [data, location]
  );

  return (
    <>
      <div
        style={{
          width: width,
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

      <InputField
        location={location}
        applyDissabled={applyDissabled}
        handleLocation={handleLocation}
        handleChoiseReset={handleChoiseReset}
        handleChoiseApply={handleChoiseApply}
      />
    </>
  );
}

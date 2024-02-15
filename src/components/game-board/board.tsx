import React, { useState, useEffect, useRef, useMemo } from "react";

import { Frame } from "./board-frame";
import { Popover } from "@mui/material";
import { InputField, LocationType } from "./board-input";

import { AllFrameTypes, MapFramesType, FrameParamsType, RuinTypes } from "@/data/types";

export type GameBoardPropsType = {
  openInputStep: boolean;
  mapFrames: MapFramesType[];
  inputHandler: (newMapFrames: MapFramesType[], coins?: number, ruin?: boolean) => unknown;
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
  inputHandler: (newMapFrames: MapFramesType[], coins?: number, ruin?: boolean) => unknown;
};

function InputBoard(props: InputBoardPropsType) {
  const { mapFrames, inputHandler, width } = props;

  const [inputMapFrames, setInputMapFrames] = useState<(MapFramesType & { isEdit?: boolean })[]>(
    mapFrames.map((el) => ({ ...el, isEdit: false }))
  );

  const handleChoiseReset = () => {
    setInputMapFrames(mapFrames.map((el) => ({ ...el, isEdit: false })));
  };

  const frameClickHandler = (id: string) => {
    setInputMapFrames((prev) => {
      const indexItem = prev.findIndex((e) => e.id == id);
      const res = [...prev];
      res[indexItem] = { ...mapFrames[indexItem], isEdit: !Boolean(res[indexItem].isEdit) };
      return res;
    });
    locationHandler(location);
  };

  const locationHandler = (framesParams: LocationType) => {
    setInputMapFrames((prev) => {
      const newData = [...prev].map((el) => {
        if (el.isEdit) {
          const [frameType, frameSubType] = framesParams.type;

          const addRuin = framesParams.params.includes("ruin");
          let ruinType = el?.ruinType;
          if (addRuin && el?.ruinType === "none") ruinType = "added" as RuinTypes;
          if (!addRuin && el?.ruinType === "added") ruinType = "none" as RuinTypes;

          return {
            id: el.id,
            isEdit: el.isEdit,
            frameType: frameType ?? el.frameType,
            frameSubType: frameSubType ?? el.frameSubType,
            coinType: el.coinType,
            ruinType,
          };
        }
        return el;
      });

      return newData;
    });
  };

  const handleChoiseApply = () => {
    const newMap = [...inputMapFrames].map((el) => {
      delete el.isEdit;
      return el;
    });
    const addCoin = location.params.includes("coin");
    const addRuin = location.params.includes("ruin");
    inputHandler(newMap, addCoin ? 1 : 0, addRuin);
  };

  const [location, setLocation] = useState<LocationType>({ type: [], params: [] });

  const handleLocationType = (newType: AllFrameTypes[]) => {
    setLocation((prev) => {
      const newValue = { ...prev, type: newType };
      locationHandler(newValue);
      return newValue;
    });
  };

  const handleLocationParams = (newParams: FrameParamsType[]) => {
    setLocation((prev) => {
      const newValue = { ...prev, params: newParams };
      locationHandler(newValue);
      return newValue;
    });
  };

  const applyDissabled = useMemo(() => {
    const notEditFrames = inputMapFrames.findIndex((el) => el.isEdit === true) === -1;
    const notLocationSelect = location.type.length === 0;
    return notEditFrames || notLocationSelect;
  }, [inputMapFrames, location]);

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
        {inputMapFrames.map((el) => (
          <Frame key={el.id} {...el} usageIn="edit" handler={frameClickHandler} />
        ))}
      </div>

      <InputField
        location={location}
        applyDissabled={applyDissabled}
        handleLocationType={handleLocationType}
        handleLocationParams={handleLocationParams}
        handleChoiseReset={handleChoiseReset}
        handleChoiseApply={handleChoiseApply}
      />
    </>
  );
}

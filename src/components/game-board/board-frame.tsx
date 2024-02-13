import React from "react";

type FieldTypes = "none" | "hill" | "home" | "tree" | "evil" | "brim" | "pond" | "void";
type SubFieldTypes = "ruin" | "coin";

type FrameType = {
  id: string;
  type: FieldTypes;
  subType?: SubFieldTypes;
};

type FrameProps = {
  //...FrameType,
  id: string;
  type: FieldTypes;
  subType?: SubFieldTypes;

  handler?: (id: string) => unknown;
  isEdit?: boolean;
  usageIn: "show" | "edit";
};

const FramesParams = {
  void: { imgSrc: "0" },
  hill: { imgSrc: "1" },
  none: { imgSrc: "2" },
  home: { imgSrc: "3" },
  tree: { imgSrc: "4" },
  evil: { imgSrc: "5" },
  brim: { imgSrc: "6" },
  pond: { imgSrc: "7" },
  // sub
  show: { imgSrc: "-a" },
  edit: { imgSrc: "-b" },
};

export const Frame = React.memo((props: FrameProps) => {
  const { id, type, subType, isEdit, handler, usageIn } = props;

  const useInEdit = usageIn === "edit";

  const onClickHandler = () => {
    if (handler) handler(id);
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white", //isEdit ? "transparent" :
        aspectRatio: "1/1",
        alignItems: "center",
        justifyContent: "center",
        //cursor: "pointer",
        borderRadius: 2,
        opacity: useInEdit ? (isEdit ? 1 : 0.4) : 1,
      }}
      onClick={useInEdit ? onClickHandler : undefined}
    >
      <p style={{}}>{FramesParams[type]?.imgSrc}</p>
    </div>
  );
});

import { MapFramesType } from "@/data/types";

export function mapFramesCompare(oldMapFrames: MapFramesType[], newMapFrames: MapFramesType[]) {
  const newFrames = [];
  const oldFrames = [];

  for (let i = 0; i < oldMapFrames.length; i++) {
    const oldFrame = oldMapFrames[i];
    const newFrame = newMapFrames[i];

    if (oldFrame.frameType !== newFrame.frameType) {
      //
      const oldIndex = oldFrames.findIndex((el) => el.kind === oldFrame.frameType);
      if (oldIndex === -1) {
        oldFrames.push({ count: 1, kind: oldFrame.frameType });
      } else {
        oldFrames[oldIndex].count = 1 + oldFrames[oldIndex].count;
      }
      //

      const newIndex = newFrames.findIndex((el) => el.kind === newFrame.frameType);
      if (newIndex === -1) {
        newFrames.push({ count: 1, kind: newFrame.frameType });
      } else {
        newFrames[newIndex].count = 1 + newFrames[newIndex].count;
      }
    }
  }
  return { newFrames, oldFrames };
}

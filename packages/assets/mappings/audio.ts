export enum Audio {
  Background = "background",
  Background2 = "background2",
  Bleep = "Bleep_01",
  Bleep2 = "Bleep_02",
  Bleep3 = "Bleep_03",
  Bleep4 = "Bleep_04",
  Bleep5 = "Bleep_05",
  Bleep6 = "Bleep_06",
  Bleep7 = "Bleep_07",
  Click = "Click_01",
  Click2 = "Click_02",
  Click3 = "Click_03",
  Click4 = "Click_04",
  Sequence = "Sequence_01",
  Sequence2 = "Sequence_02",
  Sequence3 = "Sequence_03",
  Sequence4 = "Sequence_04",
  Sequence5 = "Sequence_05",
  Sequence6 = "Sequence_06",
  Sequence7 = "Sequence_07",
  Execute = "Execute_01",
  Execute2 = "Execute_02",
  DataPoint = "Data_Point_01",
  DataPoint2 = "Data_Point_02",
  Confirm = "Confirm_01",
  Confirm2 = "Confirm_02",
  Confirm3 = "Confirm_03",
  Confirm4 = "Confirm_04",
  Confirm5 = "Confirm_05",
  Confirm6 = "Confirm_06",
  Confirm7 = "Confirm_07",
  Complete = "Complete_01",
  Complete2 = "Complete_02",
  Upgrade = "Upgrade",
  Build = "Build",
  Demolish = "Demolish",
  Whoosh = "Whoosh",
}

export type AudioKeys = keyof typeof Audio;

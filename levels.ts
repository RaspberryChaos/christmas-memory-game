export interface CardType {
    name: string;
    src: string;
    matched: boolean;
    id?: number;
  }

export const cardList: CardType[] = [
  { name: "snowman", src: "/cardImgs/snowman.png", matched: false },
  { name: "santa", src: "/cardImgs/santa.png", matched: false },
  { name: "penguin", src: "/cardImgs/penguin.png", matched: false },
  { name: "reindeer", src: "/cardImgs/reindeer.png", matched: false },
  { name: "candy canes", src: "/cardImgs/candyCanes.png", matched: false },
  { name: "gingerbread", src: "/cardImgs/gingerbread.png", matched: false },
  { name: "holly", src: "/cardImgs/holly.png", matched: false },
  { name: "bells", src: "/cardImgs/bells.png", matched: false },
  { name: "christmas tree", src: "/cardImgs/christmasTree.png", matched: false },
  { name: "sleigh red", src: "/cardImgs/sleighRed.png", matched: false },
  { name: "green present", src: "/cardImgs/greenPresent.png", matched: false },
  { name: "red present", src: "/cardImgs/redPresent.png", matched: false },
  { name: "north pole", src: "/cardImgs/northPole.png", matched: false },
  { name: "santa face", src: "/cardImgs/santaFace.png", matched: false },
  { name: "santa sleigh", src: "/cardImgs/santaSleigh.png", matched: false },
  { name: "stocking", src: "/cardImgs/stocking.png", matched: false },
];

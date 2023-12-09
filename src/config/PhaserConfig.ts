import Phaser from "phaser";

import DragPlugin from "phaser3-rex-plugins/plugins/drag-plugin";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js";
import MainScene from "../scenes/MainScene.ts";

const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;

export const config = {
  type: Phaser.WEBGL,
  backgroundColor: "#285cc4",
  parent: "app",
  width: width,
  height: height,
  scale: {
    mode: Phaser.Scale.FIT,
  },
  scene: [MainScene],
  plugins: {
    global: [
      {
        key: "dragPlugin",
        plugin: DragPlugin,
        start: true,
      },
    ],
    scene: [
      {
        key: "rexUI",
        plugin: RexUIPlugin,
        mapping: "rexUI",
      },
    ],
  },
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  disableContextMenu: false,
} as Phaser.Types.Core.GameConfig;

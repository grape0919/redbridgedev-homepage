"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ChannelIO?: (command: string, options?: Record<string, unknown>) => void;
    ChannelIOInitialized?: boolean;
  }
}

const CHANNEL_IO_PLUGIN_KEY = "67c115a7-6f07-4d5d-8ca4-ccc656592bd5";

export default function ChannelTalk() {
  useEffect(() => {
    // TBT 감소를 위해 브라우저 idle 시간에 로드. 없으면 3초 후 지연 로드.
    const ric =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 3000);

    const cancelRic =
      typeof window.cancelIdleCallback === "function"
        ? window.cancelIdleCallback
        : (id: number) => window.clearTimeout(id);

    const handle = ric(() => {
      const w = window;
      if (w.ChannelIO) {
        return console.error("ChannelIO script included twice.");
      }
      const ch: {
        (command: string, options?: Record<string, unknown>): void;
        q: unknown[][];
        c: (args: unknown[]) => void;
      } = function (command: string, options?: Record<string, unknown>) {
        ch.c([command, options]);
      } as {
        (command: string, options?: Record<string, unknown>): void;
        q: unknown[][];
        c: (args: unknown[]) => void;
      };
      ch.q = [];
      ch.c = function (args: unknown[]) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;

      if (!w.ChannelIOInitialized) {
        w.ChannelIOInitialized = true;
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        const x = document.getElementsByTagName("script")[0];
        if (x.parentNode) {
          x.parentNode.insertBefore(s, x);
        }
      }

      w.ChannelIO?.("boot", { pluginKey: CHANNEL_IO_PLUGIN_KEY });
    });

    return () => {
      cancelRic(handle as number);
      window.ChannelIO?.("shutdown");
    };
  }, []);

  return null;
}

// Channel.io 열기 함수 (외부에서 사용 가능)
export const openChannelTalk = () => {
  window.ChannelIO?.("showMessenger");
};

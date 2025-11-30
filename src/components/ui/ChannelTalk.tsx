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
    // Channel.io 스크립트 로드
    (function () {
      const w = window;
      if (w.ChannelIO) {
        return console.error("ChannelIO script included twice.");
      }
      const ch: { (command: string, options?: Record<string, unknown>): void; q: unknown[][]; c: (args: unknown[]) => void } = function (command: string, options?: Record<string, unknown>) {
        ch.c([command, options]);
      } as { (command: string, options?: Record<string, unknown>): void; q: unknown[][]; c: (args: unknown[]) => void };
      ch.q = [];
      ch.c = function (args: unknown[]) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;

      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
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

      if (document.readyState === "complete") {
        l();
      } else {
        w.addEventListener("DOMContentLoaded", l);
        w.addEventListener("load", l);
      }
    })();

    // Channel.io 부트
    window.ChannelIO?.("boot", {
      pluginKey: CHANNEL_IO_PLUGIN_KEY,
    });

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.ChannelIO?.("shutdown");
    };
  }, []);

  return null;
}

// Channel.io 열기 함수 (외부에서 사용 가능)
export const openChannelTalk = () => {
  window.ChannelIO?.("showMessenger");
};

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zudpqcumadczmudaawch.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZHBxY3VtYWRjem11ZGFhd2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2NTQ4MTQsImV4cCI6MjA1NDIzMDgxNH0.E5sPiSaZhmmoJMSH5nZ7LZ8xmRlfoA2nWhLGORiSqNM"
);

const AudioRecorderPage = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudios, setRecordedAudios] =
    useState<{ url: string; name: string }[]>();
  const [isUploading, setIsuploading] = useState<boolean>(false);
  const testAudioRef = useRef<HTMLAudioElement | null>(null);
  const [browserSupportForPlaying, setBrowserSupportForPlaying] = useState<
    Record<string, any>
  >({});
  const [browserSupportForRecording, setBrowserSupportForRecording] = useState<
    Record<string, any>
  >({});
  const [mediaRecorderSupported, setMediaRecorderSupported] =
    useState<boolean>(false);
  const [selectedMimeType, setSelectedMimeType] = useState<string>("");

  const getBestSupportedFormat = (): string => {
    if (MediaRecorder.isTypeSupported("audio/mp4;codecs=mp4a.40.2")) {
      return "audio/mp4;codecs=mp4a.40.2";
    } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
      return "audio/mp4";
    }
    const preferredFormats = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/ogg",
      "audio/mp4;codecs=mp4a.40.2",
      "audio/mpeg",
      "audio/wav",
    ];

    for (const format of preferredFormats) {
      if (MediaRecorder.isTypeSupported(format)) {
        return format;
      }
    }

    return "audio/webm"; // fallback
  };

  const getFileExtensionFromMimeType = (mimeType: string): string => {
    const mimeToExtension: Record<string, string> = {
      "audio/webm": "webm",
      "audio/webm;codecs=opus": "webm",
      "audio/ogg": "ogg",
      "audio/ogg;codecs=opus": "ogg",
      "audio/mp4": "m4a",
      "audio/mp4;codecs=mp4a.40.2": "m4a",
      "audio/mpeg": "mp3",
      "audio/wav": "wav",
      "audio/aac": "aac",
    };

    // Remove any codec information for matching
    const baseType = mimeType.split(";")[0];
    return mimeToExtension[mimeType] || mimeToExtension[baseType] || "webm";
  };

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.storage
        .from("sei bucket")
        .list("mama", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      const urlList: { url: string; name: string }[] = [];
      data?.forEach((d) => {
        if (d.name === ".emptyFolderPlaceholder") return;
        const { data: pubUrl } = supabase.storage
          .from("sei bucket")
          .getPublicUrl(`mama/${d.name}`);

        urlList.push({ name: d.name, url: pubUrl.publicUrl });
      });
      setRecordedAudios(urlList);
    }
    getData();
  }, [isUploading]);

  useEffect(() => {
    const supportedFormatsForPlaying = {
      wav: testAudioRef.current?.canPlayType("audio/wav"),
      mp3: testAudioRef.current?.canPlayType("audio/mpeg"),
      m4a: testAudioRef.current?.canPlayType('audio/mp4; codecs="mp4a.40.2"'),
      ogg: testAudioRef.current?.canPlayType('audio/ogg; codecs="vorbis"'),
      webm: testAudioRef.current?.canPlayType('audio/webm; codecs="vorbis"'),
      aac: testAudioRef.current?.canPlayType("audio/aac"),
    };

    const supportedFormatsForRecording = {
      wav: MediaRecorder.isTypeSupported("audio/wav"),
      mp3: MediaRecorder.isTypeSupported("audio/mpeg"),
      m4a: MediaRecorder.isTypeSupported("audio/mp4"),
      ogg: MediaRecorder.isTypeSupported("audio/ogg"),
      webm: MediaRecorder.isTypeSupported("audio/webm"),
      aac: MediaRecorder.isTypeSupported("audio/aac"),
    };

    const bestFormat = getBestSupportedFormat();

    setSelectedMimeType(bestFormat);
    setBrowserSupportForPlaying(supportedFormatsForPlaying);
    setBrowserSupportForRecording(supportedFormatsForRecording);
    setMediaRecorderSupported(!!window.MediaRecorder);
  }, []);
  const [wakeLock, setWakeLock] = useState<any>(null); // State to hold wake lock
  const requestWakeLock = async () => {
    if ("wakeLock" in navigator) {
      try {
        const lock = await (navigator as any).wakeLock.request("screen");
        setWakeLock(lock);
        lock.addEventListener("release", () => {
          console.log("Wake Lock was released");
        });
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      console.warn("Wake Lock API not supported in this browser.");
    }
  };

  const releaseWakeLock = () => {
    if (wakeLock) {
      wakeLock.release();
      setWakeLock(null);
    }
  };

  async function startRecording(): Promise<void> {
    await requestWakeLock(); // Prevent screen from locking
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setIsRecording(true);
    setAudioUrl(undefined);

    mediaRecorderRef.current = new MediaRecorder(mediaStream, {
      mimeType: selectedMimeType,
    });
    const audioChunks: Blob[] = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      console.log("on data available chunks here =>");
      console.log(e.data);
      audioChunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = (e) => {
      const audioBlob = new Blob(audioChunks, {
        type: selectedMimeType,
      });
      console.log("final combined blob here =>");
      console.log(audioBlob);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      setAudioBlob(audioBlob);
      releaseWakeLock();
    };

    mediaRecorderRef.current.start();
  }

  async function stopRecording() {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef?.current?.stream
      .getTracks()
      .forEach((track) => track.stop());

    setIsRecording(false);
  }
  useEffect(() => {
    // Clean up wake lock on component unmount
    return () => {
      releaseWakeLock();
    };
  }, []);
  async function playRecordedAudio() {
    audioPlayerRef.current?.play();
  }

  async function uploadAudioToBakend() {
    if (!audioBlob) return;
    setIsuploading(true);
    const fileExtension = getFileExtensionFromMimeType(selectedMimeType);
    const { data, error } = await supabase.storage
      .from("sei bucket")
      .upload(`mama/${crypto.randomUUID()}.${fileExtension}`, audioBlob);
    setIsuploading(false);
  }

  return (
    <div className="">
      <audio src="" ref={testAudioRef}></audio>
      <div className="flex gap-1 w-[80%] mx-auto justify-center mt-4">
        <Button
          onClick={() => startRecording()}
          disabled={isRecording || isUploading}
        >
          start
        </Button>
        <Button
          onClick={() => stopRecording()}
          disabled={!isRecording || isUploading}
        >
          Stop
        </Button>

        <Button
          onClick={() => uploadAudioToBakend()}
          disabled={isRecording || !audioUrl}
        >
          Upload to server
        </Button>
      </div>
      {isRecording ? (
        <div className="text-center animate-pulse">
          "Recording.....!!!!! 🎙️🎙️🎙️🎙️"
        </div>
      ) : null}

      {isUploading ? (
        <div className="text-center animate-pulse">
          Uploading........!!!!🔼🔼🔼🔼
        </div>
      ) : null}

      {audioUrl ? (
        <audio
          controls
          src={audioUrl}
          ref={audioPlayerRef}
          onClick={() => playRecordedAudio()}
        ></audio>
      ) : null}

      <section className="flex flex-col gap-5 mx-auto w-[80%] mt-5 items-center">
        <h1 className="text-center w-full text-lg text-slate-400">
          Recorded audios
        </h1>
        {recordedAudios?.map((d, index) => (
          <div key={index}>
            <span className="text-slate-500">{d.name}</span>
            <audio src={d.url} key={index} controls preload="metadata"></audio>
          </div>
        ))}
      </section>
      <div className="border-2 rounded-md p-2 border-sky-400 mx-auto w-[80%]">
        <h2 className="text-3xl">Browser support</h2>
        Support for MediaRecorder :{" "}
        {mediaRecorderSupported ? " Available" : " Not Available"}
        <div className="break-all"></div>
      </div>
      <div className="border-2 rounded-md p-2 border-sky-400 mx-auto w-[80%]">
        <p>
          <span className="uppercase text-orange-500 font-bold">YOUR</span>{" "}
          Browsers can{" "}
          <span className="uppercase text-orange-500 font-bold">play</span> the
          listed audio files....
        </p>

        <div className="break-all">
          {Object.entries(browserSupportForPlaying).map(
            ([format, value], index) => {
              return (
                <div key={index}>
                  {format} :{" "}
                  {value === ""
                    ? "🔴 NO SUPPORT"
                    : value === "probably"
                    ? "🟢 will play"
                    : value === "maybe"
                    ? "🟡 not enough info"
                    : "🔺Got no info🔺"}
                </div>
              );
            }
          )}
        </div>
      </div>

      <div className="border-2 rounded-md p-2 border-sky-400 mx-auto w-[80%] mt-4">
        <p className="font-semibold mb-2">
          Currently using: {selectedMimeType}
        </p>
        <p>
          <span className="uppercase text-orange-500 font-bold">YOUR</span>{" "}
          Browsers can{" "}
          <span className="uppercase text-orange-500 font-bold">record</span>{" "}
          the listed audio files....
        </p>
        <div className="break-all">
          {Object.entries(browserSupportForRecording).map(
            ([key, value], index) => {
              return (
                <div key={index}>
                  {key} : {value ? "🟢yes" : "🔴NO"}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorderPage;

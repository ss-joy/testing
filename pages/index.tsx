// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";

// const IndexPage = () => {
//   const [count, setCount] = useState<number>(0);
//   return (
//     <div>
//       {count}
//       <br />
//       <Button
//         variant={"secondary"}
//         onClick={() => setCount((prev) => prev + 1)}
//       >
//         Increase
//       </Button>
//     </div>
//   );
// };

// export default IndexPage;
import { Button } from "@/components/ui/button";
import axios from "axios";
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
  const [recordedAudios, setRecordedAudios] = useState<string[]>();
  const [isUploading, setIsuploading] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.storage
        .from("sei bucket")
        .list("mama", {
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
        });
      console.log(data);
      const urlList: string[] = [];
      data?.forEach((d) => {
        if (d.name === ".emptyFolderPlaceholder") return;
        const { data: pubUrl } = supabase.storage
          .from("sei bucket")
          .getPublicUrl(`mama/${d.name}`);
        // console.log(pubUrl);

        urlList.push(pubUrl.publicUrl);
      });
      setRecordedAudios(urlList);
    }
    getData();
  }, [isUploading]);

  async function startRecording(): Promise<void> {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    setIsRecording(true);
    setAudioUrl(undefined);

    mediaRecorderRef.current = new MediaRecorder(mediaStream);
    const audioChunks: Blob[] = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = (e) => {
      const audioBlob = new Blob(audioChunks, {
        type: "audio/wav",
      });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      setAudioBlob(audioBlob);
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

  async function playRecordedAudio() {
    audioPlayerRef.current?.play();
  }

  async function uploadAudioToBakend() {
    if (!audioBlob) return;
    setIsuploading(true);

    // const formData = new FormData();
    // formData.append("file", audioBlob, "test1.wav");

    // const res = await axios.post(
    //   "http://localhost:5000/api/file-upload/audio",
    //   formData
    // );
    // console.log(res);
    const { data, error } = await supabase.storage
      .from("sei bucket")
      .upload(`mama/${crypto.randomUUID()}.wav`, audioBlob);
    setIsuploading(false);
  }

  return (
    <div className="">
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
      {audioUrl ? (
        <audio
          controls
          src={audioUrl}
          ref={audioPlayerRef}
          onClick={() => playRecordedAudio()}
        ></audio>
      ) : null}
      {/* llll */}

      <section className="flex flex-col gap-5 mx-auto w-[80%] mt-5 items-center">
        <h1 className="text-center w-full text-lg text-slate-400">
          Recorded audios
        </h1>
        {recordedAudios?.map((d, index) => (
          <audio src={d} key={index} controls></audio>
        ))}
      </section>
    </div>
  );
};

export default AudioRecorderPage;

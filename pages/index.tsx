import { SpeechToText } from "../src/components/speech-to-text";

// const Home2 = () => {
//   const [audioData, setAudioData] = useState<Blob | null>(null);
//   const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
//     null
//   );
//   const [disabledStopButton, setDisabledStopButton] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     console.log("navigation start");
//     // デバイスがサポートされているか確認する
//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       setError("This device is not supported");
//       return;
//     }
//     // ユーザーの音声使用許可を要求する
//     async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//         });
//         // audio/webm形式での録音が可能かどうかを確認
//         if (!MediaRecorder.isTypeSupported("audio/webm")) {
//           setError("audio/webm is not supported");
//           return;
//         }

//         // レコーディングのインスタンスを作成
//         const recorder = new MediaRecorder(stream, {
//           mimeType: "video/webm;codecs=vp9",
//         });

//         // 録音中イベントハンドラー
//         recorder.addEventListener("dataavailable", (event: BlobEvent) => {
//           console.log("recording");
//           if (event.data.size > 0) {
//             // 音声データをセット
//             setAudioData(event.data);
//           }
//         });

//         setMediaRecorder(recorder);
//       } catch (error) {
//         console.error("getUserMedia error", error);
//       }
//     };
//   }, []);

//   // const handleSuccess = (stream) => {
//   //   // レコーディングのインスタンスを作成
//   //   audioRef.current = new MediaRecorder(stream, {
//   //     mimeType: "video/webm;codecs=vp9",
//   //   });
//   //   // 音声データを貯める場所
//   //   var chunks = [];
//   //   // 録音が終わった後のデータをまとめる
//   //   audioRef.current.addEventListener("dataavailable", (ele) => {
//   //     if (ele.data.size > 0) {
//   //       chunks.push(ele.data);
//   //     }
//   //     // 音声データをセット
//   //     setFile(chunks);
//   //   });
//   //   // 録音を開始したら状態を変える
//   //   audioRef.current.addEventListener("start", () => setAudioState(false));
//   //   // 録音がストップしたらchunkを空にして、録音状態を更新
//   //   audioRef.current.addEventListener("stop", () => {
//   //     setAudioState(true);
//   //     chunks = [];
//   //   });
//   // };

//   // 録音開始
//   const handleStart = useCallback(() => {
//     console.log("start");
//     setDisabledStopButton(true);
//     mediaRecorder
//       ? mediaRecorder.start()
//       : setError("Media Recorder is undefined");
//   }, [mediaRecorder]);

//   // 録音停止
//   const handleStop = () => {
//     console.log("stop");
//     setDisabledStopButton(false);
//     mediaRecorder
//       ? mediaRecorder.stop()
//       : setError("Media Recorder is undefined");
//   };
//   // firebaseに音声ファイルを送信
//   // const handleSubmit = () => {
//   //   // firebaseのrefを作成
//   //   var storageRef = firebase.storage().ref();
//   //   var metadata = {
//   //     contentType: "audio/mp3",
//   //   };
//   //   // ファイル名を付けてBlobからファイルを作成して送信
//   //   var mountainsRef = storageRef.child(new Date() + "test.mp3");
//   //   mountainsRef.put(new Blob(file), metadata).then(function () {
//   //     console.log("アップロード完了！");
//   //   });
//   // };
//   // const handleRemove = () => {
//   //   setAudioState(true);
//   //   setFile([]);
//   // };

//   return (
//     <div>
//       <div>{error}</div>
//       <button onClick={handleStart}>録音</button>
//       <button onClick={handleStop} disabled={disabledStopButton}>
//         ストップ
//       </button>
//       {/* <button onClick={handleSubmit} disabled={file.length === 0}>
//         送信
//       </button> */}
//       {/* <button onClick={handleRemove}>削除</button> */}
//       <ReactAudioPlayer
//         // src={URL.createObjectURL(new Blob(audioData))}
//         src={audioData ? URL.createObjectURL(audioData) : ""}
//         controls
//       />
//     </div>
//   );
// };

// export const Home = () => {
//   const { status, startRecording, stopRecording, mediaBlobUrl } =
//     useReactMediaRecorder({ audio: true });

//   return (
//     <div>
//       <p>{status}</p>
//       <button onClick={startRecording}>Start Recording</button>
//       <button onClick={stopRecording}>Stop Recording</button>
//       {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
//       <ReactAudioPlayer src={mediaBlobUrl} controls />
//     </div>
//   );
// };

// const Recorder = dynamic(
//   () =>
//     import("../src/components/audio-recorder").then(
//       (module) => module.AudioRecorder
//     ),
//   { ssr: false }
// );

const Home = () => {
  return (
    <div>
      <SpeechToText />
    </div>
  );
};

export default Home;

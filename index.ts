const escapeText = (text: string) => {
  let escapedText = text;
  escapedText = escapedText.replace(/&/g, "&amp;");
  escapedText = escapedText.replace(/"/g, "&quot;");
  escapedText = escapedText.replace(/</g, "&lt;");
  escapedText = escapedText.replace(/>/g, "&gt;");
  return escapedText;
};

const speakToSSML = ({ text }: { text: string }) => {
  return `<speak>${escapeText(text)}</speak>`;
};

type StrengthType = "x-weak" | "weak" | "medium" | "strong" | "x-strong";

const breakToSSML = ({
  time,
  strength,
}: {
  time: string;
  strength?: StrengthType;
}) => {
  const timeWithUnit = /\d$/.test(time) ? `${time}ms` : time;
  const strengtT = strength ? ` strength="${strength}"` : "";
  return `<break time=${timeWithUnit}${strengtT}/>`;
};

type InterpretAsType =
  | "currency"
  | "telephone"
  | "verbatim"
  | "spell-out"
  | "date"
  | "characters"
  | "cardinal"
  | "ordinal"
  | "fraction"
  | "expletive"
  | "bleep"
  | "unit"
  | "time"
  | "duration";

type DateFormatType = "dm" | "dmy" | "yyyymmdd";
type TimeFormatType = "hms12";
type DurationFormatType = "h:m";

type FormatType = DateFormatType | TimeFormatType | DurationFormatType;

type DetailType = "1" | "2";

interface SayAsToSSMLParams {
  text: string;
  interpretAs: InterpretAsType;
  format?: FormatType;
  detail?: DetailType;
}

const sayAsToSSML = ({
  text,
  interpretAs,
  format,
  detail,
}: SayAsToSSMLParams) => {
  const attributes = [
    format ? ` format="${format}"` : "",
    detail ? ` detail="${detail}"` : "",
  ];

  return `<say-as interpret-as="${interpretAs}"${attributes}>${escapeText(
    text
  )}</say-as>`;
};

const audioToSSML = ({
  text,
  src,
  desc,
  clipBegin,
  clipEnd,
  speed,
  repeatCount,
  repeatDur,
  soundLevel,
}: {
  text: string;
  src: string;
  desc: string;
  clipBegin?: string;
  clipEnd?: string;
  speed?: string;
  repeatCount?: string;
  repeatDur?: string;
  soundLevel?: string;
}) => {
  const attributes = [
    clipBegin ? ` clipBegin="${clipBegin}"` : "",
    clipEnd ? ` clipEnd="${clipEnd}"` : "",
    speed ? ` speed="${speed}"` : "",
    repeatCount ? ` repeatCount="${repeatCount}"` : "",
    repeatDur ? ` repeatDur="${repeatDur}"` : "",
    soundLevel ? ` soundLevel="${soundLevel}"` : "",
  ]
    .filter(Boolean)
    .join("");

  return `<audio src="${src}"${attributes}><desc>${desc}</desc>${escapeText(
    text
  )}</audio>`;
};

const pToSSML = ({ text }: { text: string }) => {
  return `<p>${escapeText(text)}</p>`;
};

const sToSSML = ({ text }: { text: string }) => {
  return `<s>${escapeText(text)}</s>`;
};

const subToSSML = ({ text, alias }: { text: string; alias: string }) => {
  return `<sub alias=${alias}>${escapeText(text)}</sub>`;
};

const markToSSML = ({ name }: { name: string }) => {
  return `<mark name=${name}/>`;
};

const prosodyToSSML = ({
  text,

  rate,
  pitch,
}: {
  text: string;

  rate: string;
  pitch: string;
}) => {
  return `<prosody rate=${rate} pitch=${pitch}>${escapeText(text)}</prosody>`;
};

const emphasisToSSML = ({
  text,
  level,
}: {
  text: string;
  level: "strong" | "moderate" | "none" | "reduced";
}) => {
  return `<emphasis level=${level}>${escapeText(text)}</emphasis>`;
};

const phonemeToSSML = ({
  text,
  alphabet,
  ph,
}: {
  text: string;
  alphabet: string;
  ph: string;
}) => {
  return `<phoneme alphabet=${alphabet} ph=${ph}>${escapeText(text)}</phoneme>`;
};

const voiceToSSML = ({
  text,
  language,
  gender,
}: {
  text: string;
  language: string;
  gender: "male" | "female" | "neutral";
}) => {
  return `<voice language=${language} gender=${gender}>${escapeText(
    text
  )}</voice>`;
};

const langToSSML = ({ text, language }: { text: string; language: string }) => {
  return `<lang xml:lang=${language}>${escapeText(text)}</lang>`;
};

console
  .log
  //   speakToSSML({ text: "lorem" })
  //   breakToSSML({time:"200", strength:"x-strong"})
  // sayAsToSSML({text:"lorem", interpretAs:"time", format:"dm"})
  ();

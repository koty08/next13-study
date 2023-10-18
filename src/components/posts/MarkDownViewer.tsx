"use client";

import MDEditor from "@uiw/react-md-editor";

export default function MarkDownViewer({ content }: { content: string }) {
  return <MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} components={{ img: customImage }}></MDEditor.Markdown>;
}

const customImage = ({ ...props }) => {
  return <img className="border" {...props} />;
};

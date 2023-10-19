/* eslint-disable @next/next/no-img-element */
"use client";

import MDEditor from "@uiw/react-md-editor";
import Link from "next/link";

export default function MarkDownViewer({ content }: { content: string }) {
  return <MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} components={{ img: CustomImage }}></MDEditor.Markdown>;
}

const CustomImage = ({ ...props }) => {
  return (
    <Link href={props.src} target="_blank">
      <img className="hover:cursor-pointer" {...props} alt="image" />
    </Link>
  );
};

export const CustomDeleteImage = ({ ...props }) => {
  return <img className="hover:cursor-pointer" {...props} alt="image" />;
};

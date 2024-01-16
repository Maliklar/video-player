import React, { ReactNode, useState } from "react";
const canvas = document.createElement("canvas");
export const Context = React.createContext({
  setElements: (elements: SetElementsProps) => {},
});

type SetElementsProps = {
  containerElement: HTMLDivElement;
  ambientElement: HTMLDivElement;
  videoElement: HTMLVideoElement;
};

type Props = {
  children: ReactNode;
};
export default function VideoContext({ children }: Props) {
  const [loading, setLoading] = useState();
  const [video, setVideo] = useState<HTMLVideoElement>();
  const [ambient, setAmbient] = useState<HTMLDivElement>();
  const [container, setContainer] = useState<HTMLDivElement>();
  function setElements(elements: SetElementsProps) {
    // setVideo(elements.videoElement);
    // setAmbient(elements.ambientElement);
    // setContainer(elements.containerElement);
    console.log("CALLEDCALLEDCALLED", elements);
  }
  console.log(ambient);

  return (
    <Context.Provider
      value={{
        setElements,
      }}
    >
      {children}
    </Context.Provider>
  );
}

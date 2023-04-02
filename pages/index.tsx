import { useEffect, useRef } from "react";
import kotobas from "../data/kotoba";
import { gsap } from "gsap";
export default function Home() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 1,
      duration: 2,
      ease: "power4.inout",
    });
  }, []);
  return (
    <div className="wrap" ref={ref}>
      <div className="heading">Ariel の励ましの言葉</div>
      <div className="kotoba-wrap">
        {kotobas.map((kotoba, index) => {
          return (
            <Box key={index} content={kotoba.content} date={kotoba.date} />
          );
        })}
      </div>
      <canvas className="l-canvas"></canvas>
    </div>
  );
}

interface Props {
  content: string;
  date: string;
}

const Box = ({ content, date }: Props) => {
  return (
    <>
      <div className="kotoba">
        <div className="date">{date}</div>
        <div className="content">{content}</div>
      </div>
    </>
  );
};

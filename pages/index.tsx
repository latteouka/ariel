import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { DataType } from "./api/posts";
import axios from "axios";

export interface ResponseAPI {
  nextId: number | null;
  previousId: number | null;
  data: DataType[];
}

export default function Home() {
  const { ref: inViewRef, inView } = useInView();
  const ref = useRef(null);

  // scroll and load
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["posts"],
      async ({ pageParam = 0 }) => {
        const res = await axios.get("/api/posts?cursor=" + pageParam);
        return res.data;
      },
      {
        getNextPageParam: (lastPage: ResponseAPI) =>
          lastPage.nextId ?? undefined,
      }
    );

  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 1,
      duration: 2,
      ease: "power4.inout",
    });
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="wrap" ref={ref}>
      <div className="heading">Ariel の励ましの言葉</div>
      {data && (
        <>
          <div className="kotoba-wrap">
            {data.pages.map((page) => (
              <React.Fragment key={page.nextId}>
                {page.data.map((post, index) => (
                  <Box key={index} content={post.content} date={post.date} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div ref={inViewRef} className="status">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load Newer"
              : "End"}
          </div>
        </>
      )}
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

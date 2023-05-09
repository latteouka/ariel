import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { DataType } from "./api/posts";
import axios from "axios";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
                {page.data.map((post, index) => {
                  const monthNext = page.data[index - 1]
                    ? new Date(page.data[index - 1].date).getMonth()
                    : 0;

                  const monthNow = new Date(post.date).getMonth();

                  return (
                    <Box
                      key={index}
                      content={post.content}
                      date={post.date}
                      reply={post.reply}
                      changeMonth={monthNow < monthNext}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div ref={inViewRef} className="status">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load Newer"
              : "🐈‍⬛"}
          </div>
        </>
      )}
      <canvas className="l-canvas"></canvas>
    </div>
  );
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Box = ({ content, date, reply, changeMonth }: DataType) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const animations = gsap.utils.toArray(".kotoba");
      animations.forEach((animation: any) => {
        gsap.to(animation, {
          x: "0",
          opacity: 1,
          duration: 0.5,
          ease: "slowmo",
          scrollTrigger: {
            trigger: animation,
            start: "bottom bottom",
          },
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <>
      <div className="kotoba">
        {changeMonth && (
          <div className="month">{monthNames[new Date(date).getMonth()]}</div>
        )}
        <div className="date">{date}</div>
        <div className="content">
          {content}
          <span className="reply">{reply ?? ""}</span>
        </div>
      </div>
    </>
  );
};

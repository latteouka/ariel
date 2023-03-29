import kotobas from "../data/kotoba";
export default function Home() {
  return (
    <div className="wrap">
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

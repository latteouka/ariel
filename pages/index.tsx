export default function Home() {
  return (
    <div className="wrap">
      <div className="heading">Ariel の励ましの言葉</div>
      <div className="kotoba-wrap">
        <Box>
          🙌🏻こんにちは之今日encouragement
          (&quot;)有夢想是一件很了不起的事(&quot;) 很累的時候可以去看John
          Wick真的會一直笑(笑う) 完全是爽片哈哈哈哈哈：）
        </Box>
        <Box>
          💫☕️ Today, i am presenting one of my favorite quotes from Stephen
          King. “Talent is cheaper than table salt. What separates the talented
          individual from the successful one is a lot of hard work.” Have a nice
          day then(cool)
        </Box>
        <Box>
          適合耍廢的週日 休息也(4)很重要(~) 每天都很有幹勁的話似乎累得很快：）
          累得時候 抱著一杯熱茶(drink) 坐在落地窗前 配上世界の終わり的歌📻
          重新整理好思緒再繼續開始 -今日是僅供參考の個人方法(emoji)-
          https://youtu.be/Lsb6Dq-92NA
        </Box>
        <Box>
          (&quot;)人可能會背叛自己 但是努力會一起走下去的(！)(&quot;)
          我也要回家準備考試了(tears) 但是 我們可以的啦(~)
        </Box>
        <Box>
          昨天看小說看到的(~) “Our greatest weakness lies in giving up. The most
          certain way to succeed is always to try just one more time.”
          雖然劇情很(cream)哈哈哈哈哈哈哈
        </Box>
      </div>
    </div>
  );
}

const Box = ({ children }: { children: React.ReactNode }) => {
  return <div className="kotoba">{children}</div>;
};

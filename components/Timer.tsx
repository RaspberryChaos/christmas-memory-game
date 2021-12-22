type Props = {
  minutes: number;
  seconds: number;
};

const Timer: React.FC<Props> = ({ minutes, seconds }) => {
  return (
    <div className="clock">
      <p>
        0{minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </p>
    </div>
  );
};

export default Timer;

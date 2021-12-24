type Props = {
  minutes: number;
  seconds: number;
};

const timerStyle = {
  fontSize: 24,
  margin: 10,
  textShadow: `var(--shadow-text)`,
};

const Timer: React.FC<Props> = ({ minutes, seconds }) => {
  return (
    <p style={timerStyle}>
      Time: 0{minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </p>
  );
};

export default Timer;

import Image from "next/image";

interface Props {
  src: string;
  link?: string;
}

const Icon: React.FC<Props> = ({ src,link }) => {
  return (
    <div style={{ margin: "20px" }}>
        <a href={link}>
      <Image
        src={src}
        width="100"
        height="100"
        layout="intrinsic"
        priority={true}
      />
      </a>
    </div>
  );
};

export default Icon;

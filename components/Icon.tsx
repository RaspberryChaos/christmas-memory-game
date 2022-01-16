import Image from "next/image";
import Link from "next/link";

interface Props {
  src: string;
  alt: string;
  link?: string;
  toggleMusic?: () => void;
}

const Icon: React.FC<Props> = ({ src, link, alt, toggleMusic }) => {
  return (
    <div style={{ margin: "20px" }}>
      {link ? (
        <Link href={link} passHref>
          <a>
            <Image
              src={src}
              width="100"
              height="100"
              layout="intrinsic"
              priority={true}
              alt={alt}
              className="global-icon"
            />
          </a>
        </Link>
      ) : toggleMusic ? (
        <Image
          src={src}
          width="100"
          height="100"
          layout="intrinsic"
          priority={true}
          alt={alt}
          className="global-icon"
          onClick={toggleMusic}
        />
      ) : (
        <Image
          src={src}
          width="100"
          height="100"
          layout="intrinsic"
          priority={true}
          alt={alt}
          className="global-icon"
        />
      )}
    </div>
  );
};

export default Icon;

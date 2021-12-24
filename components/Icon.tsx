import Image from "next/image";
import Link from "next/link";

interface Props {
  src: string;
  link?: string;
  alt: string;
}

const Icon: React.FC<Props> = ({ src, link, alt }) => {
  return (
    <div style={{ margin: "20px" }}>
      {link ? (
        <Link href={link} passHref>
          <Image
            src={src}
            width="100"
            height="100"
            layout="intrinsic"
            priority={true}
            alt={alt}
          />
        </Link>
      ) : (
        <Image
          src={src}
          width="100"
          height="100"
          layout="intrinsic"
          priority={true}
          alt={alt}
        />
      )}
    </div>
  );
};

export default Icon;

import Image from "next/image";

interface Props {
    src:string,
}

const Icon: React.FC<Props>= ({src}) => {
    return (
        <div style={{margin:"20px"}}>
            <Image
              src={src}
              width="100"
              height="100"
              layout="intrinsic"
              priority={true}
            />
          </div>
    )
}

export default Icon;

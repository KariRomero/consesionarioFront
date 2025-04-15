import Link from "next/link"
import Image from "next/image"

const Logo: React.FC = () => {
  return (
    <Link href={'/'}>
          <Image
            src={"/rodar_letras_ultra_hd.png"}
            alt="Logo"
            width={150}
            height={100}
          />
        </Link>
  )
}

export default Logo

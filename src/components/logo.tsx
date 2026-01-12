import Link from 'next/link';
import Image from 'next/image';

const LOGO_URL = 'https://storage.googleapis.com/stager-ca225.appspot.com/1785501831881.png';

export function Logo() {
  return (
    <Link href="#inicio" className="flex items-center gap-2" aria-label="Tapicería Rincón Home">
       <Image src={LOGO_URL} alt="Tapicería Rincón Logo" width={200} height={50} priority className="h-auto" />
    </Link>
  );
}

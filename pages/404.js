import Link from 'next/link';
import * as Style from '../styles/error.module.scss'

const NotFound = () => {
  return (
    <>
      <div className={Style.error_container}>
        <div className={Style.not_found}>
          <h1>Ooops...</h1>
          <h2>That page cannot be found :( 🙄🙄</h2>
          <p>
            Go back to the{' '}
            <Link href="/">
              <a>Homepage</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;

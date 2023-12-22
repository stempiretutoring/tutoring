import Link from 'next/link';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href="/login">Login</Link>
      <a href="/api/auth/logout">Logout</a>
      <div className={styles.description}>
        <p>
          Get started below
        </p>
      </div>

      <div className={styles.grid}>
        <Link
          href="/tutoring/appointment"
          className={styles.card}
          rel="noopener noreferrer"
        >
          <h2>
            Book an appointment <span>-&gt;</span>
          </h2>
          <p>Exactly what the title says</p>
        </Link>

        <Link
          href="/tutors"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Meet our tutors <span>-&gt;</span>
          </h2>
          <p>Learn about our staff</p>
        </Link>
      </div>
    </main>
  )
}


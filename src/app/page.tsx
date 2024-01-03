"use client"
import Link from "next/link";
import styles from "./page.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Get started below</p>
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
  );
}

"use client"
import Link from "next/link";
import styles from "./page.module.css";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p className="font-bold italic text-xl">At STEMpire Tutoring, we believe quality academic assistance should be available for a reasonable price.  Our experienced team of college and high school students seeks to help those struggling with schoolwork and instill within them a sense of pride in their work. 
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
  );
}

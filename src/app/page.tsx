"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className="m-4 flex align-center justify-content">
        <Image width={300} height={300} src="./home.png" />
      </div>

        <p className="font-bold italic text-2xl">
          At STEMpire Tutoring, we believe quality academic assistance should be
          available for a reasonable price. Our experienced team of college and
          high school students seeks to help those struggling with schoolwork
          and instill within them a sense of pride in their work.
        </p>
      </div>

            <div className={styles.grid}>
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

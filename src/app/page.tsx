"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image alt="stempire logo" className="m-3" width={300} height={300} src="./home2.png" />
      <div className="sm:text-sm">
        <div className="m-4 flex align-center justify-content">
          <p className="font-bold italic text-md md:text-xl lg:text-2xl">
            At STEMpire Tutoring, we believe quality academic assistance should
            be available for a reasonable price. Our experienced team of college
            and high school students seeks to help those struggling with
            schoolwork and instill within them a sense of pride in their work.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        <Link
          href="/tutors"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Tutors <span>-&gt;</span>
          </h2>
          <p>Learn about our staff</p>
        </Link>
        <Link
          href="/about/rates"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Prices <span>-&gt;</span>
          </h2>
          <p>View our rates</p>
        </Link>
        <Link
          href="/about/mission"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Booking <span>-&gt;</span>
          </h2>
          <p>Schedule an appointment</p>
        </Link>
        <Link
          href="/book"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Mission Statement <span>-&gt;</span>
          </h2>
          <p>What we stand for</p>
        </Link>
      </div>
    </main>
  );
}

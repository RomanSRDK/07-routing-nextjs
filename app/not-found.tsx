"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import css from "./not-found.module.css";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you&#39;re looking for doesn&#39;t exist.
      </p>
      <p>
        You will be automatically redirected to the homepage in a few seconds…
      </p>

      <Link href="/" className={css.backButton}>
        ← Go back home
      </Link>
    </div>
  );
}

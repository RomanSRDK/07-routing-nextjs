"use client";
import { useParams } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import css from "./NoteDetailsClient.module.css";
import { useRouter } from "next/navigation";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/notes/filter/all");
    }
  };

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
        <main className={css.main}>
          <div className={css.container}>
            <button
              type="button"
              className={css.backButton}
              onClick={handleClick}
            >
              ← Go back
            </button>

            <div className={css.item}>
              <div className={css.header}>
                <h2>{data.title}</h2>
              </div>
              <p className={css.tag}>{data.tag}</p>
              <p className={css.content}>{data.content}</p>
              <p className={css.date}>{data.createdAt}</p>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

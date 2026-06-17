"use client";

import { useParams } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import css from "../../../notes/[id]/NoteDetailsClient.module.css";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const router = useRouter();

  return (
    <>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && <p>Something went wrong.</p>}
      {data && (
        <Modal onClose={() => router.back()}>
          <div className={css.container}>
            <button
              type="button"
              className={css.backButton}
              onClick={() => router.back()}
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
        </Modal>
      )}
    </>
  );
}

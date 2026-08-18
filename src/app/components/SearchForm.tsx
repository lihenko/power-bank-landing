"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";


/**
 * ============================================================
 * SEARCH FORM
 * ============================================================
 *
 * Форма пошуку товарів.
 *
 * Після введення запиту:
 *
 *   /search?q=павербанк
 *
 * ============================================================
 */

interface SearchFormProps {
  initialQuery?: string;
}


export default function SearchForm({
  initialQuery = "",
}: SearchFormProps) {

  const router =
    useRouter();


  const [query, setQuery] =
    useState(
      initialQuery
    );


  /*
   * ----------------------------------------------------------
   * SUBMIT
   * ----------------------------------------------------------
   */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();


    const value =
      query.trim();


    /*
     * Порожній пошук
     */

    if (!value) {

      router.push(
        "/search"
      );

      return;
    }


    /*
     * URLSearchParams автоматично
     * коректно кодує українські символи.
     */

    const params =
      new URLSearchParams();

    params.set(
      "q",
      value
    );


    /*
     * Переходимо на сторінку пошуку.
     */

    router.push(
      `/search?${params.toString()}`
    );

  }


  /*
   * ----------------------------------------------------------
   * RENDER
   * ----------------------------------------------------------
   */

  return (
    <form
      onSubmit={
        handleSubmit
      }

      className="
        flex
        w-full
        items-center
        gap-2
      "
    >

      <div
        className="
          relative
          flex-1
        "
      >

        <input
          type="search"

          value={
            query
          }

          onChange={(
            event
          ) =>
            setQuery(
              event.target.value
            )
          }

          placeholder="
            Пошук товарів...
          "

          aria-label="
            Пошук товарів
          "

          className="
            h-11
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            pr-11
            text-sm
            text-slate-900
            outline-none
            transition

            placeholder:text-slate-400

            focus:border-green-500
            focus:ring-2
            focus:ring-green-500/20
          "
        />

        {query.length > 0 && (

          <button
            type="button"

            onClick={() =>
              setQuery("")
            }

            aria-label="
              Очистити пошук
            "

            className="
              absolute
              right-3
              top-1/2
              flex
              h-6
              w-6
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            ×
          </button>

        )}

      </div>


      <button
        type="submit"

        aria-label="
          Знайти
        "

        className="
          flex
          h-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-green-600
          px-5
          text-sm
          font-semibold
          text-white
          transition

          hover:bg-green-700

          focus:outline-none
          focus:ring-2
          focus:ring-green-500/30
        "
      >

        Пошук

      </button>

    </form>
  );
}
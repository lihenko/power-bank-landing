import Link from "next/link";


/*
 * ============================================================
 * PROPS
 * ============================================================
 */

interface SearchPaginationProps {
  query: string;
  currentPage: number;
  totalPages: number;
}


/*
 * ============================================================
 * COMPONENT
 * ============================================================
 */

export default function SearchPagination({
  query,
  currentPage,
  totalPages,
}: SearchPaginationProps) {

  /*
   * ----------------------------------------------------------
   * Якщо сторінка тільки одна —
   * пагінація не потрібна.
   * ----------------------------------------------------------
   */

  if (totalPages <= 1) {
    return null;
  }


  /*
   * ----------------------------------------------------------
   * URL
   * ----------------------------------------------------------
   */

  function getPageUrl(
    page: number
  ): string {

    const params =
      new URLSearchParams();


    /*
     * Пошуковий запит
     */

    params.set(
      "q",
      query
    );


    /*
     * Для першої сторінки
     * page не додаємо.
     */

    if (page > 1) {

      params.set(
        "page",
        String(page)
      );

    }


    return `/search?${params.toString()}`;
  }


  /*
   * ----------------------------------------------------------
   * ДІАПАЗОН СТОРІНОК
   * ----------------------------------------------------------
   */

  const pages: number[] = [];

  const maxVisiblePages = 5;


  let startPage =
    Math.max(
      1,
      currentPage -
        Math.floor(
          maxVisiblePages / 2
        )
    );


  let endPage =
    Math.min(
      totalPages,
      startPage +
        maxVisiblePages -
        1
    );


  /*
   * Якщо ми близько до кінця —
   * зміщуємо початок назад.
   */

  if (
    endPage - startPage + 1 <
    maxVisiblePages
  ) {

    startPage =
      Math.max(
        1,
        endPage -
          maxVisiblePages +
          1
      );

  }


  /*
   * ----------------------------------------------------------
   * FORM PAGES ARRAY
   * ----------------------------------------------------------
   */

  for (
    let page = startPage;
    page <= endPage;
    page++
  ) {

    pages.push(page);

  }


  /*
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <nav
      aria-label="Навігація по сторінках пошуку"
      className="
        mt-12
        flex
        items-center
        justify-center
        gap-2
      "
    >

      {/* ==================================================
          PREVIOUS
          ================================================== */}

      {currentPage > 1 && (

        <Link
          href={getPageUrl(
            currentPage - 1
          )}
          aria-label="Попередня сторінка"
          className="
            flex
            h-10
            min-w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            px-3
            text-sm
            font-medium
            text-slate-700
            transition
            hover:border-slate-300
            hover:bg-slate-50
          "
        >
          ←
        </Link>

      )}


      {/* ==================================================
          FIRST PAGE
          ================================================== */}

      {startPage > 1 && (

        <>

          <Link
            href={getPageUrl(1)}
            aria-current={
              currentPage === 1
                ? "page"
                : undefined
            }
            className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
              currentPage === 1
                ? "border-green-600 bg-green-600 text-white"
                : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            1
          </Link>


          {startPage > 2 && (

            <span
              className="
                px-1
                text-slate-400
              "
            >
              ...
            </span>

          )}

        </>

      )}


      {/* ==================================================
          PAGES
          ================================================== */}

      {pages.map(
        (page) => (

          <Link
            key={page}
            href={getPageUrl(page)}
            aria-current={
              page === currentPage
                ? "page"
                : undefined
            }
            className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
              page === currentPage
                ? "border-green-600 bg-green-600 text-white"
                : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {page}
          </Link>

        )
      )}


      {/* ==================================================
          LAST PAGE
          ================================================== */}

      {endPage < totalPages && (

        <>

          {endPage <
            totalPages - 1 && (

            <span
              className="
                px-1
                text-slate-400
              "
            >
              ...
            </span>

          )}


          <Link
            href={getPageUrl(
              totalPages
            )}
            aria-current={
              currentPage === totalPages
                ? "page"
                : undefined
            }
            className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
              currentPage === totalPages
                ? "border-green-600 bg-green-600 text-white"
                : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {totalPages}
          </Link>

        </>

      )}


      {/* ==================================================
          NEXT
          ================================================== */}

      {currentPage <
        totalPages && (

        <Link
          href={getPageUrl(
            currentPage + 1
          )}
          aria-label="Наступна сторінка"
          className="
            flex
            h-10
            min-w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            px-3
            text-sm
            font-medium
            text-slate-700
            transition
            hover:border-slate-300
            hover:bg-slate-50
          "
        >
          →
        </Link>

      )}

    </nav>
  );
}
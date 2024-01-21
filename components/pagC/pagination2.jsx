"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const scrollRef = useRef(null);

  const saveScrollPosition = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollPosition = window.scrollY;
    }
  };

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.scrollPosition) {
      window.scrollTo(0, scrollRef.current.scrollPosition);
    }
  }, []);

  return (
    <div ref={scrollRef}>
      <div className="flex gap-14">
        <div>
          
            <Link href={`/admin?page=${page - 1}`} passHref scroll={false}>
              <Button disabled={!hasPrev} variant="default" onClick={saveScrollPosition}>
                Prev
              </Button>
            </Link>
          
        </div>
        <div>
          
            <Link href={`/admin?page=${page + 1}`} passHref scroll={false}>
              <Button disabled={!hasNext} variant="default" onClick={saveScrollPosition}>
                Next
              </Button>
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Pagination;

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
        <div style={{marginLeft:'25px'}}>
            <Link href={`/?page=${page - 1}`} passHref scroll={false}>
              <Button  variant="default" onClick={saveScrollPosition} disabled={!hasPrev}>
                Prev
              </Button>
            </Link>
        </div>
        <div style={{marginLeft:'20px'}}>
          
            <Link href={`/?page=${page + 1}`} passHref scroll={false}>
              <Button  variant="default" onClick={saveScrollPosition} disabled={!hasNext}>
                Next
              </Button>
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress } from "@material-ui/core";

// Adapted from: https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f
const InfiniteScroll = ({ children, itemsPerPage = 16, filter }) => {
  // tracking on which page we currently are
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(React.Children.count(children) / itemsPerPage);
  // add loader refrence
  const loader = useRef(null);

  // Reset everything
  useEffect(() => {
    setPage(1);

    let observer = null;

    if (loader.current) {
      var options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      };

      // here we handle what happens when user scrolls to Load More div
      // in this case we just update page variable
      const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
          setPage((page) => Math.min(page + 1, maxPage));
        }
      };

      // initialize IntersectionObserver
      observer = new IntersectionObserver(handleObserver, options);
      observer.observe(loader.current);
    }

    return () =>
      loader.current && observer && observer.unobserve(loader.current);
  }, [children]);

  return (
    <>
      {React.Children.toArray(children).splice(0, page * itemsPerPage)}
      <Box ref={loader} width={1}>
        {page < maxPage && (
          <Box marginY={3} display="flex" justifyContent="center" width={1}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};

export default InfiniteScroll;

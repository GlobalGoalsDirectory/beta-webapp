import React, { useEffect, useState, useRef } from "react";
import { Box, CircularProgress } from "@material-ui/core";

// Adapted from: https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f
const InfiniteScroll = ({ children, itemsPerPage = 16, filter }) => {
  // tracking on which page we currently are
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(React.Children.count(children) / itemsPerPage);
  // add loader refrence
  const loader = useRef(null);

  useEffect(() => {
    setPage(1);

    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    // initialize IntersectionObserver
    // and attaching to Load More div
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [children]);

  // here we handle what happens when user scrolls to Load More div
  // in this case we just update page variable
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((page) => Math.min(page + 1, maxPage));
    }
  };

  return (
    <>
      {React.Children.toArray(children).splice(0, page * itemsPerPage)}
      {page < maxPage && (
        <Box
          marginY={3}
          display="flex"
          justifyContent="center"
          width={1}
          ref={loader}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default InfiniteScroll;

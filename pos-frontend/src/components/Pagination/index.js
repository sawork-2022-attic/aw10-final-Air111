import React from "react";
import { useState } from 'react';
import './index.css'
import Page from '../Page';
import PageChange from '../PageChange';
import PageEllipsis from '../PageEllipsis';

const Pagination = ({ defaulPage = 1, totalPage, onSelect }) => {
  const [current, setCurrent] = useState(defaulPage);

  const handleClick = (value) => {
    setCurrent(value);
    onSelect(value);
  }

  const handlePageChangeClick = (step) => {
    setCurrent(prev => {
      const newPage = prev + step;
      const truePage= newPage >= 1 && newPage <= totalPage ? newPage
        : newPage < 1 ? 1
          : newPage > totalPage ? totalPage
            : 1;
      onSelect(truePage);
      return truePage;
    })
  }

  const getCenterPages = (current, totalPage) => {
    let leftPages = 2;
    let rightPages = 2;
    let start = current - leftPages;
    let end = current + rightPages;
    if (current - leftPages < 1) {
      start = 1;
      const leftRemain = 1 - (current - leftPages);
      end = current + rightPages + leftRemain <= totalPage
        ? current + rightPages + leftRemain
        : totalPage;
    } else {
      if (current + rightPages > totalPage) {
        end = totalPage;
        const rightRemain = current + rightPages - totalPage;
        start = current - leftPages - rightRemain >= 1
          ? current - leftPages - rightRemain
          : 1;
      }
    }

    const pages = Array.from({ length: end - start + 1 }, (_, k) => k + start)
    return pages;
  }
  const pages = getCenterPages(current, totalPage);
  return (
    <div
      className='pagination'
    >
      <PageChange
        deriction={"left"}
        handleClick={handlePageChangeClick}
        disabled={current === 1}
      />
      {
        pages[0] >= 3 ? (
          <>
            <Page
              key={1}
              page={1}
              selected={current === 1}
              handleClick={handleClick}
            />
            <PageEllipsis
              direction={"left"}
              handleClick={handlePageChangeClick}
              step={5}
            />
          </>
        )
          : pages[0] === 2 ? (
            <Page
              key={1}
              page={1}
              selected={current === 1}
              handleClick={handleClick}
            />
          )
            : null
      }
      {
        pages.map((page) => {
          return (
            <Page
              key={page}
              page={page}
              selected={current === page}
              handleClick={handleClick}
            />
          )
        })
      }
      {
        pages[pages.length - 1] + 1 < totalPage ? (
          <>
            <PageEllipsis
              direction={"right"}
              handleClick={handlePageChangeClick}
              step={5}
            />
            <Page
              key={totalPage}
              page={totalPage}
              selected={current === totalPage}
              handleClick={handleClick}
            />

          </>
        )
          : pages[pages.length - 1] + 1 === totalPage ? (
            <Page
              key={totalPage}
              page={totalPage}
              selected={current === totalPage}
              handleClick={handleClick}
            />
          )
            : null
      }
      <PageChange
        deriction={"right"}
        handleClick={handlePageChangeClick}
        disabled={current === totalPage}
      />
    </div>
  )
}

export default Pagination;
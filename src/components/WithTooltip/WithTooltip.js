import { useEffect, useRef, useState } from 'react';
import style from './WithTooltip.module.css';

const WithTooltip = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cordX, setCordX] = useState(null);
  const [tooltipWidth, setTooltipWidth] = useState(null);

  const ref = useRef(null);

  useEffect(() => {
    setTooltipWidth(parseInt(getComputedStyle(ref.current).width));

    if (tooltipWidth + cordX + 20 > window.innerWidth) {
      setCordX(window.innerWidth - tooltipWidth - 20);
    }
  }, [cordX, tooltipWidth]);

  function mouseEnterHandler(event) {
    setShowTooltip(true);
    setCordX(event.pageX);
  }

  function mouseLeaveHandler() {
    setShowTooltip(false);
  }

  const styleTooltip = {
    left: cordX - 10,
    display: showTooltip ? 'block' : 'none'
  };

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={mouseLeaveHandler}
      className={style.wrapper}
    >
      {children}

      <span
        className={style.tooltip}
        style={styleTooltip}
        onMouseEnter={mouseLeaveHandler}
        ref={ref}
      >
        {text}
      </span>
    </div>
  );
};

export default WithTooltip;

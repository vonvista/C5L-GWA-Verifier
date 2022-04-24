import { useState, useCallback, useRef } from 'react';

// This custom hook handles the event of hovering over a wrapped component.
// Referenced from https://www.30secondsofcode.org/react/s/use-hover
export function useHover () {

    // useState holds the hovering state.
    const [isHovering, setIsHovering] = useState(false);

    // useCallback() memoizes two handler functions, handleMouseOver and handleMouseOut, that updates the hovering state.
    const handleMouseOver = useCallback(() => setIsHovering(true), []);
    const handleMouseOut = useCallback(() => setIsHovering(false), []);
  
    // useRef() hook keeps track of the last node passed to callbackRef to be able to remove event listeners from it.
    const nodeRef = useRef();
  
    // callbackRef uses useCallback() to create/update the listeners for the 'mouseover' and 'mouseout' events.
    const callbackRef = useCallback(
      node => {
        if (nodeRef.current) {
          nodeRef.current.removeEventListener('mouseover', handleMouseOver);
          nodeRef.current.removeEventListener('mouseout', handleMouseOut);
        }
  
        nodeRef.current = node;
  
        if (nodeRef.current) {
          nodeRef.current.addEventListener('mouseover', handleMouseOver);
          nodeRef.current.addEventListener('mouseout', handleMouseOut);
        }
      },
      [handleMouseOver, handleMouseOut]
    );
  
    return [callbackRef, isHovering];
};
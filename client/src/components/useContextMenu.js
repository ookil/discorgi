import { useCallback, useEffect, useState } from 'react';

const useContextMenu = (channelsRefs, channelsWrapperRef) => {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handleContextMenu = useCallback(
    (e) => {
      const clickedWrapper = channelsWrapperRef.current === e.target;

      const target = channelsRefs.find((ref) => ref.current.contains(e.target));

      if (target || clickedWrapper) {
        e.preventDefault(); //prevent default right click menu

        setPosX(e.pageX - 70);

        if (e.pageY + 100 > channelsWrapperRef.current.clientHeight) {   //i know this solution is terrible
          setPosY(e.pageY - 93);
        } else {
          setPosY(e.pageY);
        }
        setShowMenu(true);

        if (target) {
          setCurrentItem(target.current.id);
        } else {
          setCurrentItem('WRAPPER');
        }
      } else {
        setShowMenu(false);
      }
    },
    [setPosX, setPosY, channelsRefs]
  );

  const handleClick = useCallback(() => {
    setShowMenu(false);
  }, [setShowMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  return { posX, posY, showMenu, currentItem };
};

export default useContextMenu;

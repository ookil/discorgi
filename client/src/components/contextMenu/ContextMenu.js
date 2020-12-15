import Menu from './Menu';
import useContextMenu from '../useContextMenu';

const ContextMenu = ({ channelsRefs, channelsWrapperRef }) => {
  const { posX, posY, showMenu, currentItem } = useContextMenu(
    channelsRefs,
    channelsWrapperRef
  );

  return showMenu ? (
    <div
      className='context-menu'
      style={{
        top: posY,
        left: posX,
      }}
    >
      <Menu currentItem={currentItem} />
    </div>
  ) : (
    <></>
  );
};

export default ContextMenu;

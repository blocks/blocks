/** @jsx jsx */
import { jsx } from 'theme-ui'

import { useCode } from '../providers/code'
import { useEditor } from '../providers/editor'

const Tree = ({
  tree,
  depth,
  selectedId,
  hoveredId,
  onSelect,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <div
      sx={{
        backgroundColor: tree.id === selectedId ? 'highlight' : 'transparent'
      }}
    >
      <button
        onMouseEnter={() => onMouseEnter(tree.id)}
        onMouseLeave={() => onMouseLeave(tree.id)}
        onClick={() => onSelect(tree.id)}
        sx={{
          appearance: 'none',
          width: '100%',
          p: 0,
          pl: depth * 16, // Indent based on depth
          textAlign: 'left',
          color: tree.id === selectedId ? 'background' : 'text',
          backgroundColor:
            tree.id === selectedId
              ? 'primary'
              : tree.id === hoveredId
              ? 'border'
              : 'transparent',
          border: 0,
          cursor: 'pointer',
          outline: 0,
          '&:hover': {
            // Don't apply hover effect to selected item
            backgroundColor: tree.id === selectedId ? null : 'border'
          },
          '&:focus': {
            boxShadow: theme => `inset 0 0 0 2px ${theme.colors.primary}`
          }
        }}
      >
        <div
          sx={{
            px: 3,
            py: 2,
            fontSize: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {tree.name}
        </div>
      </button>
      {tree.children.map(child => (
        <Tree
          key={child.id}
          tree={child}
          depth={depth + 1}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ))}
    </div>
  )
}

const TreePanel = () => {
  const {
    tree,
    currentElementId,
    currentHoveredElementId,
    setCurrentElementId,
    hoverElementId,
    removeHoveredElementId
  } = useCode()
  const { updateActiveTabByName } = useEditor()

  return (
    <div
      sx={{
        py: 2,
        overflow: 'auto',
        borderRight: '1px solid',
        borderColor: 'border'
      }}
    >
      {tree.children.map(child => (
        <Tree
          key={child.id}
          tree={child}
          depth={0}
          selectedId={currentElementId}
          hoveredId={currentHoveredElementId}
          onSelect={elementId => {
            setCurrentElementId(elementId)
            updateActiveTabByName('editor')
          }}
          onMouseEnter={elementId => hoverElementId(elementId)}
          onMouseLeave={elementId => removeHoveredElementId(elementId)}
        />
      ))}
    </div>
  )
}

export default TreePanel

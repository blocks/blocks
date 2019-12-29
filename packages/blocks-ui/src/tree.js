/** @jsx jsx */
import { jsx } from 'theme-ui'

export default function Tree({ tree, depth, selectedId, onSelect }) {
  return (
    <div
      sx={{
        backgroundColor: tree.id === selectedId ? 'highlight' : 'transparent'
      }}
    >
      <button
        onClick={() => onSelect(tree.id)}
        sx={{
          appearance: 'none',
          width: '100%',
          p: 0,
          pl: depth * 16, // Indent based on depth
          textAlign: 'left',
          color: tree.id === selectedId ? 'background' : 'text',
          backgroundColor: tree.id === selectedId ? 'primary' : 'transparent',
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
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

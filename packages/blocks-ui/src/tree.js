/** @jsx jsx */
import { jsx } from 'theme-ui'

export default function Tree({ tree, depth, selectedId, onSelect }) {
  return (
    <div
      sx={{
        backgroundColor: tree.id === selectedId ? 'papayawhip' : 'transparent'
      }}
    >
      <button
        onClick={() => onSelect(tree.id)}
        sx={{
          appearance: 'none',
          width: '100%',
          pl: depth * 16, // Indent based on depth
          textAlign: 'left',
          backgroundColor: tree.id === selectedId ? 'pink' : 'transparent',
          border: 0,
          cursor: 'pointer',
          '&:hover': {
            // Don't apply hover effect to selected item
            backgroundColor: tree.id === selectedId ? null : 'lightgray'
          }
        }}
      >
        <div sx={{ px: 3, py: 2, fontSize: 1 }}>{tree.name}</div>
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

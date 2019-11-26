/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ children, onSelect }) => {
  if (!children || !children.length) {
    return null
  }

  return (
    <div
      sx={{
        borderBottom: 'thin solid #e1e6eb',
        backgroundColor: '#fafafa',
        p: 3,
        button: {
          mt: 2
        }
      }}
    >
      <h4
        sx={{
          m: 0,
          fontSize: 0,
          fontWeight: 500
        }}
      >
        Children
      </h4>
      {children.map(c => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          sx={{
            fontSize: 1,
            // color: 'black',
            textDecoration: 'none',
            appearance: 'none',
            backgroundColor: 'white',
            borderRadius: 4,
            border: 'thin solid #e1e6eb',
            display: 'block',
            textAlign: 'left',
            width: '100%',
            px: 3,
            py: 2
          }}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}

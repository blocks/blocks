/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import * as recipes from '../blocks'

export default () => (
  <Styled.root>
    <style>{`*{ box-sizing: border-box } body { margin: 0 }`}</style>
    <title>Components - Blocks UI</title>
    <h1 sx={{ ml: 2 }}>{Object.keys(recipes).length} Components</h1>
    {Object.entries(recipes).map(([name, Component]) => (
      <div key={name} sx={{ marginTop: 3, borderBottom: 'thin solid' }}>
        <h3 sx={{ ml: 2, color: '#888' }}>{name}</h3>
        <Component />
      </div>
    ))}
  </Styled.root>
)

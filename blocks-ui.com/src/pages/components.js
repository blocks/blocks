/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import * as recipes from '../blocks'

export default () => (
  <Styled.root>
    <title>Blocks UI</title>
    {Object.entries(recipes).map(([name, Component]) => (
      <div key={name}>
        <h3>{name}</h3>
        <Component />
      </div>
    ))}
  </Styled.root>
)

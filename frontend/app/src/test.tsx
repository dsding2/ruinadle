import React, { useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'

export const ListShuffler = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  return (
    <Flipper flipKey={data[-1]}>
      <button onClick={() => setData([...data, 11])}> shuffle</button>
      <div>
        {data.map(d => (
          <Flipped key={d} flipId={d}>
            <h1>{d}</h1>
          </Flipped>
        ))}
      </div>
    </Flipper>
  )
}
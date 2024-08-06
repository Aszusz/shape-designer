const Grid = () => (
  <>
    <defs>
      <pattern
        id='smallGrid'
        width='10'
        height='10'
        patternUnits='userSpaceOnUse'
      >
        <rect
          x='0.5'
          y='0.5'
          width='9'
          height='9'
          fill='none'
          stroke='#f3f4f6'
          strokeWidth='1'
        />
      </pattern>

      <pattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'>
        <rect width='100' height='100' fill='url(#smallGrid)' />
        <rect
          x='0.5'
          y='0.5'
          width='99'
          height='99'
          fill='none'
          stroke='#e5e7eb'
          strokeWidth='1'
        />
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#grid)' />
  </>
)

export default Grid

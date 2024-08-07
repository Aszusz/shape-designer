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
          x='0'
          y='0'
          width='10'
          height='10'
          fill='white'
          stroke='#f3f4f6'
          strokeWidth='1'
        />
      </pattern>

      <pattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'>
        <rect width='100' height='100' fill='url(#smallGrid)' />
        <rect
          x='0'
          y='0'
          width='100'
          height='100'
          fill='none'
          stroke='#e5e7eb'
          strokeWidth='1'
        />
      </pattern>
    </defs>

    {/* Draw a border rectangle shifted by one pixel */}
    <rect
      x='0'
      y='0'
      width='calc(100% + 2px)'
      height='calc(100% + 2px)'
      fill='black'
    />

    {/* Shift the entire grid by offsetting the rectangle */}
    <rect
      width='calc(100% - 2px)' // Adjust width to account for shift
      height='calc(100% - 2px)' // Adjust height to account for shift
      transform='translate(1, 1)'
      fill='url(#grid)'
    />
  </>
)

export default Grid

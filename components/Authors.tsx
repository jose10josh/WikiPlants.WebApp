import Link from 'next/link'
import { Grid, Typography } from '@material-ui/core'
import { useAuthors } from '@hooks/useAuthors'

type AuthorProps = {
  className?: string
}

export function Authors({ className }: AuthorProps) {
  const { data, status } = useAuthors()

  if (data == null || status !== 'success') {
    const dummyItems = Array.from({ length: 4 }, (_, i) => `item-${i}`)
    return (
      <Grid container spacing={4} className={className} justify="center">
        {dummyItems.map((item) => (
          <Grid
            xs={2}
            item
            key={item}
            className="bg-gray-200 animate pulse"
          ></Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={4} className={className} justify="center">
      {data.map(({ id, photo, fullName, handle }) => (
        <Grid item key={id}>
          <Link href={`/top-stories/${handle}`}>
            <a title={`See latest stories from ${fullName}`}>
              <img src={photo.url} width={150} />
              <Typography variant="h5" component="p">
                {fullName}
              </Typography>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

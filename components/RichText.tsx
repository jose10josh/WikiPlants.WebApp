import { BLOCKS, Document } from '@contentful/rich-text-types'
import { Typography } from '@material-ui/core'
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer'

type RichTextProps = {
  richText: RichText
  className?: string
}

const options: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <Typography variant="body1" gutterBottom color="textSecondary">
        {children}
      </Typography>
    ),
  },
}

export const RichText = ({ richText, className }: RichTextProps) => {
  return (
    <div className={className}>
      {documentToReactComponents(richText as unknown as Document, options)}
    </div>
  )
}
